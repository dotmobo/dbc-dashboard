#![no_std]

elrond_wasm::imports!();

/// An empty contract. To be used as a template when starting a new contract from scratch.
#[elrond_wasm::contract]
pub trait EmptyContract {
    #[init]
    fn init(&self, token_id: TokenIdentifier, price: BigUint) {
        self.token_id().set(&token_id);
        self.price().set(&price);
        self.bank().set(BigUint::from(0u32));
    }


    // On peut voter oui en envoyant autant de tokens que souhaité
    #[payable("*")]
    #[endpoint]
    fn buy(
        &self,
        #[payment_token] payment_token: TokenIdentifier,
        #[payment_amount] payment_amount: BigUint,
        nft_identifier: TokenIdentifier,
        nft_nonce: u64,
    ) -> SCResult<()> {
        require!(
            payment_token == self.token_id().get(),
            "Invalid payment token"
        );

        require!(
            payment_amount == self.price().get(),
            "Invalid payment amount"
        );

        let caller = self.blockchain().get_caller();

        let amount = BigUint::from(1u32);
        self.send().direct(&caller, &nft_identifier, nft_nonce, &amount , b"purchase successful");

        // Add the amount to the bank
        let bank = self.bank().get();
        self.bank().set(&bank + &payment_amount);


        Ok(())
    }


    #[only_owner]
    #[endpoint]
    fn withdraw(&self) -> SCResult<()> {

        let caller = self.blockchain().get_caller();
        let token_id = self.token_id().get();
        let bank = self.bank().get();

        self.send()
            .direct(&caller, &token_id, 0, &bank, b"withdraw successful");

        // reset the bank
        self.bank().set(BigUint::from(0u32));

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn change_price(&self, price: BigUint) -> SCResult<()> {

        self.price().set(&price);

        Ok(())
    }


    #[view(getBank)]
    #[storage_mapper("bank")]
    fn bank(&self) -> SingleValueMapper<BigUint>;

    #[view(getTokenId)]
    #[storage_mapper("token_id")]
    fn token_id(&self) -> SingleValueMapper<TokenIdentifier>;

    #[view(getPrice)]
    #[storage_mapper("price")]
    fn price(&self) -> SingleValueMapper<BigUint>;
}
