#![no_std]

elrond_wasm::imports!();

/// An empty contract. To be used as a template when starting a new contract from scratch.
#[elrond_wasm::contract]
pub trait EmptyContract {
    #[init]
    fn init(&self,
        input_token_id: EgldOrEsdtTokenIdentifier,
        output_token_id: EgldOrEsdtTokenIdentifier,
        divider: BigUint
    ) {
        self.input_token_id().set(&input_token_id);
        self.output_token_id().set(&output_token_id);
        self.divider().set(&divider);
    }

    #[payable("*")]
    #[endpoint]
    fn swap(
        &self,
        #[payment_token] payment_token: EgldOrEsdtTokenIdentifier,
        #[payment_amount] payment_amount: BigUint) -> SCResult<()> {

        require!(
            payment_token == self.input_token_id().get(),
            "Invalid payment token"
        );

        require!(
            payment_amount > BigUint::from(0u32),
            "Invalid payment amount"
        );

        let caller = self.blockchain().get_caller();
        let output_amount = payment_amount / self.divider().get();
        self.send().direct(&caller, &self.output_token_id().get(), 0, &output_amount);

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn withdraw_input_token(&self, amount: BigUint) -> SCResult<()> {
        let caller = self.blockchain().get_caller();
        self.send().direct(&caller, &self.input_token_id().get(), 0, &amount);
        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn withdraw_output_token(&self, amount: BigUint) -> SCResult<()> {
        let caller = self.blockchain().get_caller();
        self.send().direct(&caller, &self.output_token_id().get(), 0, &amount);
        Ok(())
    }


    #[view(getInputTokenId)]
    #[storage_mapper("input_token_id")]
    fn input_token_id(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getOutputTokenId)]
    #[storage_mapper("output_token_id")]
    fn output_token_id(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getDivider)]
    #[storage_mapper("divider")]
    fn divider(&self) -> SingleValueMapper<BigUint>;

}
