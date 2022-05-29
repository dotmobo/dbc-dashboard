////////////////////////////////////////////////////
////////////////// AUTO-GENERATED //////////////////
////////////////////////////////////////////////////

#![no_std]

elrond_wasm_node::wasm_endpoints! {
    nft_staking
    (
        claim
        getCurrentRewards
        getLockTime
        getMinimumStakingDays
        getNftIdentifier
        getNftNonce
        getRewardsTokenAmountPerDay
        getRewardsTokenId
        getRewardsTokenTotalSupply
        getStakingEndTime
        getStakingInfo
        getStakingStatus
        getUnstakeTime
        set_rewards_token_amount_per_day
        set_rewards_token_total_supply
        stake
        stopStaking
        unstake
        withdraw
    )
}

elrond_wasm_node::wasm_empty_callback! {}
