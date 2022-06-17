#![no_std]

elrond_wasm::imports!();

mod vote_info;
use vote_info::VoteInfo;
use elrond_wasm::types::heap::BoxedBytes;

#[elrond_wasm::contract]
pub trait Vote {
    // La fonction d'initialisation au déployement du contrat
    // On définit la question et les réponses possibles
    #[init]
    fn init(&self, question: BoxedBytes, token_id: TokenIdentifier) {
        self.question().set(&question);
        self.token_id().set(&token_id);
        if self.yes().is_empty() {
            self.yes().set(BigUint::from(0u32));
        }
        if self.no().is_empty() {
            self.no().set(BigUint::from(0u32));
        }
        if self.in_progress().is_empty() {
            self.in_progress().set(1u32);
        }
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

        // save info about the voter
        let caller: ManagedAddress = self.blockchain().get_caller();

        // if vote info exists, update it
        if !self.vote_info(&caller).is_empty() {
            let new_vote_info = VoteInfo {
                address: self.blockchain().get_caller(),
                amount: self.vote_info(&caller).get().amount + &payment_amount,
            };
            self.vote_info(&caller).clear();
            self.vote_info(&caller).set(&new_vote_info);
        } else {
            // else create a new vote info
            let new_vote_info = VoteInfo {
                address: self.blockchain().get_caller(),
                amount: payment_amount,
            };
            self.vote_info(&caller).set(&new_vote_info);
        }

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

        // save info about the voter
        let caller: ManagedAddress = self.blockchain().get_caller();

        // if vote info exists, update it
        if !self.vote_info(&caller).is_empty() {
            let new_vote_info = VoteInfo {
                address: self.blockchain().get_caller(),
                amount: self.vote_info(&caller).get().amount + &payment_amount,
            };
            self.vote_info(&caller).clear();
            self.vote_info(&caller).set(&new_vote_info);
        } else {
            // else create a new vote info
            let new_vote_info = VoteInfo {
                address: self.blockchain().get_caller(),
                amount: payment_amount,
            };
            self.vote_info(&caller).set(&new_vote_info);
        }

        Ok(())
    }

    #[endpoint]
    fn withdraw_my_amount(&self) -> SCResult<()> {
        require!(
            self.in_progress().get() == 0u32,
            "the vote is not over"
        );

        let caller: ManagedAddress = self.blockchain().get_caller();

        require!(!self.vote_info(&caller).is_empty(), "Nothing to withdraw!");
        let vote_info = self.vote_info(&caller).get();

        let my_amount = vote_info.amount;
        let token_id = self.token_id().get();

        // send rewards
        self.send()
            .direct(&caller, &token_id, 0, &my_amount, &[]);

        self.vote_info(&caller).clear();

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

    #[only_owner]
    #[endpoint]
    fn change_question(&self, question: BoxedBytes) -> SCResult<()> {
        self.question().set(&question);

        Ok(())
    }

    #[view(getMyAmount)]
    fn get_my_amount(&self, address: &ManagedAddress) -> BigUint {
        require!(!self.vote_info(&address).is_empty(), "Nothing to withdraw!");
        let vote_info = self.vote_info(&address).get();
        let amount = vote_info.amount;
        return amount;
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

    #[view(getVoteInfo)]
    #[storage_mapper("vote_info")]
    fn vote_info(&self, address: &ManagedAddress) -> SingleValueMapper<VoteInfo<Self::Api>>;
}
