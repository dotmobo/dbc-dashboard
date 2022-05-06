#![no_std]

elrond_wasm::imports!();

use elrond_wasm::types::heap::BoxedBytes;

#[elrond_wasm::contract]
pub trait Vote {
    // La fonction d'initialisation au déployement du contrat
    // On définit la question et les réponses possibles
    #[init]
    fn init(&self, question: BoxedBytes, token_id: TokenIdentifier) {
        self.question().set(&question);
        self.yes().set(BigUint::from(0u32));
        self.no().set(BigUint::from(0u32));
        self.token_id().set(&token_id);
        self.in_progress().set(1u32);
    }

    // On peut voter oui en envoyant autant de tokens que souhaité
    #[payable("*")]
    #[endpoint]
    fn vote_yes(
        &self,
        #[payment_token] payment_token: TokenIdentifier,
        #[payment_amount] payment_amount: BigUint,
    ) -> SCResult<()> {
        require!(
            payment_token == self.token_id().get(),
            "Invalid payment token"
        );

        require!(
            self.in_progress().get() == 1u32,
            "the vote is over"
        );

        let yes = self.yes().get();
        self.yes().set(&yes + &payment_amount);

        Ok(())
    }

    // On peut voter non en envoyant autant de tokens que souhaité
    #[payable("*")]
    #[endpoint]
    fn vote_no(
        &self,
        #[payment_token] payment_token: TokenIdentifier,
        #[payment_amount] payment_amount: BigUint,
    ) -> SCResult<()> {
        require!(
            payment_token == self.token_id().get(),
            "Invalid payment token"
        );

        require!(
            self.in_progress().get() == 1u32,
            "the vote is over"
        );

        let no = self.no().get();
        self.no().set(&no + &payment_amount);

        Ok(())
    }

    // Seul le owner du contrat peut récupérer les tokens qui ont été envoyés
    // Le vote doit être fini
    #[only_owner]
    #[endpoint]
    fn withdraw(&self) -> SCResult<()> {
        require!(
            self.in_progress().get() == 0u32,
            "the vote is not over"
        );

        let caller = self.blockchain().get_caller();

        let yes = self.yes().get();
        let no = self.no().get();
        let token_id = self.token_id().get();
        let amount = &yes + &no;

        self.send()
            .direct(&caller, &token_id, 0, &amount, b"withdraw successful");

        Ok(())
    }

    // Seul le owner du contrat peut stopper le vote
    #[only_owner]
    #[endpoint]
    fn finish_vote(&self) -> SCResult<()> {
        self.in_progress().set(0u32);

        Ok(())
    }



    // Les données stockées

    // La question
    #[view(getQuestion)]
    #[storage_mapper("question")]
    fn question(&self) -> SingleValueMapper<BoxedBytes>;

    // Le nombre de votes pour la réponse "oui"
    #[view(getYes)]
    #[storage_mapper("yes")]
    fn yes(&self) -> SingleValueMapper<BigUint>;

    // Le nombre de votes pour la réponse "non"
    #[view(getNo)]
    #[storage_mapper("no")]
    fn no(&self) -> SingleValueMapper<BigUint>;

    // Le token utilisé pour les votes
    #[view(getTokenId)]
    #[storage_mapper("token_id")]
    fn token_id(&self) -> SingleValueMapper<TokenIdentifier>;

    // Si le vote est terminé
    #[view(getInProgress)]
    #[storage_mapper("in_progress")]
    fn in_progress(&self) -> SingleValueMapper<u32>;
}
