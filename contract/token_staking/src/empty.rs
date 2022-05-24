#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

const STAKING_DAYS: u64 = 10;
const REWARDS_PER_DAY_PERCENT: u64 = 5;

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub stake_amount: BigUint<M>,
    pub lock_time: u64,
    pub unstake_time: u64,
}

#[elrond_wasm::contract]
pub trait TokenStaking {
    #[init]
    fn init(&self, staking_token_id: TokenIdentifier, minimum_staking_amount: BigUint) {
        self.staking_token_id().set(&staking_token_id);
        self.minimum_staking_amount().set(&minimum_staking_amount);
    }

    #[payable("*")]
    #[endpoint]
    fn stake(
        &self,
        #[payment_token] payment_token: TokenIdentifier,
        #[payment_amount] payment_amount: BigUint,
    ) {
        require!(
            payment_token == self.staking_token_id().get(),
            "Invalid staking token"
        );
        require!(
            payment_amount >= self.minimum_staking_amount().get(),
            "The staking amount must be greater than minimum amount."
        );

        let caller: ManagedAddress = self.blockchain().get_caller();

        require!(
            self.staking_info(&caller).is_empty(),
            "You have already staked."
        );

        let stake_amount: BigUint = payment_amount.clone();
        let cur_time: u64 = self.blockchain().get_block_timestamp();
        let unstake_time = cur_time + (STAKING_DAYS * 86400);

        let stake_info = StakeInfo {
            address: self.blockchain().get_caller(),
            stake_amount: stake_amount,
            lock_time: cur_time,
            unstake_time: unstake_time,
        };

        self.staking_info(&self.blockchain().get_caller())
            .set(&stake_info);
    }

    #[endpoint]
    fn unstake(&self) {
        let caller: ManagedAddress = self.blockchain().get_caller();
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&caller).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&caller).get();
        require!(
            stake_info.unstake_time <= cur_time,
            "You can't unlock staking token yet."
        );

        let stake_token_id = self.staking_token_id().get();
        let unstake_amount: BigUint = stake_info.stake_amount;

        // calculate rewards
        let staked_days = (cur_time - stake_info.lock_time) / 86400;
        let mut reward_tokens = BigUint::from(staked_days)
            .mul(&unstake_amount)
            .mul(&BigUint::from(REWARDS_PER_DAY_PERCENT))
            .div(100u64);

        reward_tokens += unstake_amount;
        self.send()
            .direct(&caller, &stake_token_id, 0, &reward_tokens, &[]);

        self.staking_info(&caller).clear();
    }


    #[only_owner]
    #[endpoint]
    fn withdraw(&self, amount: BigUint) -> SCResult<()> {
        let caller = self.blockchain().get_caller();

        let token_id = self.staking_token_id().get();

        self.send()
            .direct(&caller, &token_id, 0, &amount, b"withdraw successful");

        Ok(())
    }

    #[view(getStakingTokenId)]
    #[storage_mapper("stakingTokenId")]
    fn staking_token_id(&self) -> SingleValueMapper<TokenIdentifier>;

    #[view(getMinimumStakingAmount)]
    #[storage_mapper("minimumStakingAmount")]
    fn minimum_staking_amount(&self) -> SingleValueMapper<BigUint>;

    #[view(getStakingInfo)]
    #[storage_mapper("stakingInfo")]
    fn staking_info(&self, address: &ManagedAddress) -> SingleValueMapper<StakeInfo<Self::Api>>;
}
