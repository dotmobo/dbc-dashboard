////////////////////////////////////////////////////
////////////////// AUTO-GENERATED //////////////////
////////////////////////////////////////////////////

#![no_std]

elrond_wasm_node::wasm_endpoints! {
    multiple_nft_staking
    (
        claim
        getCurrentRewards
        getLockTime
        getMinimumStakingDays
        getNbrOfStakers
        getNftIdentifier
        getNftNonce
        getRewardsTokenAmountPerDay
        getRewardsTokenId
        getRewardsTokenTotalSupply
        getStakingEndTime
        getStakingInfo
        getStakingStatus
        getUnstakeTime
        restart_staking
        set_rewards_token_amount_per_day
        set_rewards_token_total_supply
        stake
        stop_staking
        unstake
        withdraw
    )
}

elrond_wasm_node::wasm_empty_callback! {}
