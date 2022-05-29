elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub nft_nonce: u64,
    pub lock_time: u64,
    pub unstake_time: u64,
}
