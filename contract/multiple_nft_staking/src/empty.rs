#![no_std]

elrond_wasm::imports!();
use elrond_wasm::types::heap::Vec;

mod stake_info;
use stake_info::StakeInfo;

#[elrond_wasm::contract]
pub trait NftStaking {
    #[init]
    fn init(
        &self,
        nft_identifier: EgldOrEsdtTokenIdentifier,
        minimum_staking_days: u64,
        rewards_token_id: EgldOrEsdtTokenIdentifier,
        rewards_token_amount_per_day: BigUint,
        rewards_token_total_supply: BigUint,
    ) {
        self.nft_identifier().set(&nft_identifier);
        self.minimum_staking_days().set(&minimum_staking_days);
        self.rewards_token_id().set(&rewards_token_id);
        self.rewards_token_amount_per_day()
            .set(&rewards_token_amount_per_day);
        self.rewards_token_total_supply()
            .set(&rewards_token_total_supply);
        // if staking status is empty, set it to false
        if self.staking_status().is_empty() {
            self.staking_status().set(true);
        }
        // if staking end time is empty, set it to 0
        if self.staking_end_time().is_empty() {
            self.staking_end_time().set(0);
        }
        // if nbr of stakers is empty, set it to 0
        if self.nbr_of_stakers().is_empty() {
            self.nbr_of_stakers().set(0);
        }
    }

    #[payable("*")]
    #[endpoint]
    fn stake(&self) -> SCResult<()> {
        let payments: ManagedVec<EsdtTokenPayment<Self::Api>> =
            self.call_value().all_esdt_transfers();

        require!(self.staking_status().get(), "The staking is stopped");

        for payment in &payments {
            require!(
                payment.token_identifier == self.nft_identifier().get(),
                "Invalid nft identifier"
            );
            require!(payment.token_nonce != 0, "Invalid nft nonce");
            require!(payment.amount == 1, "You can only send 1 nft");
        }

        let caller: ManagedAddress = self.blockchain().get_caller();

        require!(
            self.staking_info(&caller).is_empty(),
            "You have already staked."
        );

        let cur_time: u64 = self.blockchain().get_block_timestamp();
        let unstake_time = cur_time + (self.minimum_staking_days().get() * 86400);

        let mut vec_nonce: Vec<u64> = Vec::new();
        for payment in &payments {
            vec_nonce.push(payment.token_nonce);
        }

        let stake_info = StakeInfo {
            address: self.blockchain().get_caller(),
            nft_nonce: vec_nonce,
            lock_time: cur_time,
            unstake_time: unstake_time,
        };

        self.staking_info(&self.blockchain().get_caller())
            .set(&stake_info);

        self.nbr_of_stakers().set(self.nbr_of_stakers().get() + 1);

        Ok(())
    }

    #[endpoint]
    fn unstake(&self) -> SCResult<()> {
        let caller: ManagedAddress = self.blockchain().get_caller();
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&caller).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&caller).get();
        require!(
            stake_info.unstake_time <= cur_time,
            "You can't unlock staking nft yet."
        );

        let nft_identifier = self.nft_identifier().get();
        let nft_nonce = stake_info.nft_nonce;

        let amount = BigUint::from(1u32);

        // for each nft nonce, send nft back to caller
        for n in nft_nonce {
            self.send().direct(
                &caller,
                &nft_identifier,
                n,
                &amount,
            );
        }

        self.staking_info(&caller).clear();

        if self.nbr_of_stakers().get() > 0 {
            self.nbr_of_stakers().set(self.nbr_of_stakers().get() - 1);
        }

        Ok(())
    }

    #[endpoint]
    fn claim(&self) -> SCResult<()> {
        let caller: ManagedAddress = self.blockchain().get_caller();
        let cur_time: u64 = self.blockchain().get_block_timestamp();
        let rewards_token_total_supply = self.rewards_token_total_supply().get();

        require!(!self.staking_info(&caller).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&caller).get();

        let nft_nonce = stake_info.nft_nonce;
        let unstake_time = stake_info.unstake_time;
        let reward_token_id = self.rewards_token_id().get();

        // calculate rewards
        let mut from_time = cur_time;
        if !self.staking_status().get() {
            from_time = self.staking_end_time().get();
        }
        let mut staked_days = 0u64;
        if from_time > stake_info.lock_time {
            staked_days = (from_time - stake_info.lock_time) / 86400;
        }
        let rewards_amount = self.rewards_token_amount_per_day().get() * staked_days * nft_nonce.len() as u64;

        // check the supply
        require!(
            rewards_amount <= rewards_token_total_supply,
            "You can't claim rewards more than total supply."
        );

        // send rewards
        self.send()
            .direct(&caller, &reward_token_id, 0, &rewards_amount);

        // remove rewards amount from rewards_token_total_supply
        if rewards_token_total_supply >= rewards_amount {
            self.rewards_token_total_supply()
                .set(&(rewards_token_total_supply - rewards_amount));
        } else {
            self.rewards_token_total_supply().set(&BigUint::from(0u32));
        }

        // update staking_info
        self.staking_info(&caller).clear();
        let stake_info = StakeInfo {
            address: self.blockchain().get_caller(),
            nft_nonce: nft_nonce,
            lock_time: from_time,
            unstake_time: unstake_time,
        };
        self.staking_info(&self.blockchain().get_caller())
            .set(&stake_info);

        Ok(())
    }

    // Owner endpoints

    #[only_owner]
    #[endpoint]
    fn set_rewards_token_total_supply(&self, total_supply: BigUint) -> SCResult<()> {
        self.rewards_token_total_supply().set(&total_supply);
        Ok(())
    }

    // set rewards_token_amount_per_day
    #[only_owner]
    #[endpoint]
    fn set_rewards_token_amount_per_day(&self, amount: BigUint) -> SCResult<()> {
        self.rewards_token_amount_per_day().set(&amount);
        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn withdraw(&self, amount: BigUint) -> SCResult<()> {
        let caller = self.blockchain().get_caller();

        let token_id = self.rewards_token_id().get();

        self.send()
            .direct(&caller, &token_id, 0, &amount);

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn restart_staking(&self) -> SCResult<()> {
        self.staking_end_time().set(0);
        self.staking_status().set(true);
        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn stop_staking(&self) -> SCResult<()> {
        let cur_time: u64 = self.blockchain().get_block_timestamp();
        self.staking_end_time().set(cur_time);
        self.staking_status().set(false);
        Ok(())
    }

    // Views and storage

    #[view(getCurrentRewards)]
    fn get_current_rewards(&self, address: &ManagedAddress) -> BigUint {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();

        // calculate rewards
        let mut from_time = cur_time;
        if !self.staking_status().get() {
            from_time = self.staking_end_time().get();
        }
        let mut staked_days = 0u64;
        if from_time > stake_info.lock_time {
            staked_days = (from_time - stake_info.lock_time) / 86400;
        }
        let rewards_amount = self.rewards_token_amount_per_day().get() * staked_days * stake_info.nft_nonce.len() as u64;

        return rewards_amount;
    }

    #[view(getNftNonce)]
    fn get_nft_nonce(&self, address: &ManagedAddress) -> Vec<u64> {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();
        let nft_nonce: Vec<u64> = stake_info.nft_nonce;
        return nft_nonce;
    }

    #[view(getLockTime)]
    fn get_lock_time(&self, address: &ManagedAddress) -> u64 {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();
        let lock_time: u64 = stake_info.lock_time;
        return lock_time;
    }

    #[view(getUnstakeTime)]
    fn get_unstake_time(&self, address: &ManagedAddress) -> u64 {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();
        let unstake_time: u64 = stake_info.unstake_time;
        return unstake_time;
    }

    #[view(getNftIdentifier)]
    #[storage_mapper("nft_identifier")]
    fn nft_identifier(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getMinimumStakingDays)]
    #[storage_mapper("minimum_staking_days")]
    fn minimum_staking_days(&self) -> SingleValueMapper<u64>;

    #[view(getRewardsTokenId)]
    #[storage_mapper("rewards_token_id")]
    fn rewards_token_id(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getRewardsTokenAmountPerDay)]
    #[storage_mapper("rewards_token_amount_per_day")]
    fn rewards_token_amount_per_day(&self) -> SingleValueMapper<BigUint>;

    #[view(getStakingInfo)]
    #[storage_mapper("staking_info")]
    fn staking_info(&self, address: &ManagedAddress) -> SingleValueMapper<StakeInfo<Self::Api>>;

    #[view(getStakingStatus)]
    #[storage_mapper("staking_status")]
    fn staking_status(&self) -> SingleValueMapper<bool>;

    #[view(getStakingEndTime)]
    #[storage_mapper("staking_end_time")]
    fn staking_end_time(&self) -> SingleValueMapper<u64>;

    #[view(getRewardsTokenTotalSupply)]
    #[storage_mapper("rewards_token_total_supply")]
    fn rewards_token_total_supply(&self) -> SingleValueMapper<BigUint>;

    #[view(getNbrOfStakers)]
    #[storage_mapper("nbr_of_stakers")]
    fn nbr_of_stakers(&self) -> SingleValueMapper<u64>;
}
