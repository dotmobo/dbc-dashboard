#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub nft_nonce: u64,
    pub lock_time: u64,
    pub unstake_time: u64,
}

#[elrond_wasm::contract]
pub trait NftStaking {
    #[init]
    fn init(
        &self,
        nft_identifier: TokenIdentifier,
        minimum_staking_days: u64,
        rewards_token_id: TokenIdentifier,
        rewards_token_amount_per_day: BigUint,
    ) {
        self.nft_identifier().set(&nft_identifier);
        self.minimum_staking_days().set(&minimum_staking_days);
        self.rewards_token_id().set(&rewards_token_id);
        self.rewards_token_amount_per_day()
            .set(&rewards_token_amount_per_day);
    }

    #[payable("*")]
    #[endpoint]
    fn stake(&self) -> SCResult<()> {
        let payment: EsdtTokenPayment<Self::Api> = self.call_value().payment();
        let payment_token = payment.token_identifier;
        let payment_nonce = payment.token_nonce;
        let payment_amount = payment.amount;

        require!(
            payment_token == self.nft_identifier().get(),
            "Invalid nft identifier"
        );
        require!(payment_nonce != 0, "Invalid nft nonce");
        require!(payment_amount == 1, "You can only send 1 nft");

        let caller: ManagedAddress = self.blockchain().get_caller();

        require!(
            self.staking_info(&caller).is_empty(),
            "You have already staked."
        );

        let cur_time: u64 = self.blockchain().get_block_timestamp();
        let unstake_time = cur_time + (self.minimum_staking_days().get() * 86400);

        let stake_info = StakeInfo {
            address: self.blockchain().get_caller(),
            nft_nonce: payment_nonce,
            lock_time: cur_time,
            unstake_time: unstake_time,
        };

        self.staking_info(&self.blockchain().get_caller())
            .set(&stake_info);

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
        self.send().direct(
            &caller,
            &nft_identifier,
            nft_nonce,
            &amount,
            b"unstake successful",
        );

        self.staking_info(&caller).clear();

        Ok(())
    }

    #[endpoint]
    fn claim(&self) -> SCResult<()> {
        let caller: ManagedAddress = self.blockchain().get_caller();
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&caller).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&caller).get();

        let nft_nonce = stake_info.nft_nonce;
        let unstake_time = stake_info.unstake_time;
        let reward_token_id = self.rewards_token_id().get();

        // calculate rewards
        let staked_days = (cur_time - stake_info.lock_time) / 86400;
        let rewards_amount = self.rewards_token_amount_per_day().get() * staked_days;

        self.send()
            .direct(&caller, &reward_token_id, 0, &rewards_amount, &[]);

        self.staking_info(&caller).clear();
        let stake_info = StakeInfo {
            address: self.blockchain().get_caller(),
            nft_nonce: nft_nonce,
            lock_time: cur_time,
            unstake_time: unstake_time,
        };
        self.staking_info(&self.blockchain().get_caller())
            .set(&stake_info);

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn withdraw(&self, amount: BigUint) -> SCResult<()> {
        let caller = self.blockchain().get_caller();

        let token_id = self.rewards_token_id().get();

        self.send()
            .direct(&caller, &token_id, 0, &amount, b"withdraw successful");

        Ok(())
    }

    #[view(getCurrentRewards)]
    fn get_current_rewards(&self, address: &ManagedAddress) -> BigUint {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();

        // calculate rewards
        let staked_days = (cur_time - stake_info.lock_time) / 86400;
        let rewards_amount = self.rewards_token_amount_per_day().get() * staked_days;

        return rewards_amount;
    }

    #[view(getNftNonce)]
    fn get_nft_nonce(&self, address: &ManagedAddress) -> u64 {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();
        let nft_nonce: u64 = stake_info.nft_nonce;
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
    fn nft_identifier(&self) -> SingleValueMapper<TokenIdentifier>;

    #[view(getMinimumStakingDays)]
    #[storage_mapper("minimum_staking_days")]
    fn minimum_staking_days(&self) -> SingleValueMapper<u64>;

    #[view(getRewardsTokenId)]
    #[storage_mapper("rewards_token_id")]
    fn rewards_token_id(&self) -> SingleValueMapper<TokenIdentifier>;

    #[view(getRewardsTokenAmountPerDay)]
    #[storage_mapper("rewards_token_amount_per_day")]
    fn rewards_token_amount_per_day(&self) -> SingleValueMapper<BigUint>;

    #[view(getStakingInfo)]
    #[storage_mapper("stakingInfo")]
    fn staking_info(&self, address: &ManagedAddress) -> SingleValueMapper<StakeInfo<Self::Api>>;
}