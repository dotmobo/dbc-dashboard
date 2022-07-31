elrond_wasm::imports!();
elrond_wasm::derive_imports!();

use elrond_wasm::types::heap::Vec;

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub nft_nonce: Vec<u64>,
    pub lock_time: u64,
    pub unstake_time: u64,
}
