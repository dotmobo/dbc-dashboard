// Elrond Network
export const elrondNetwork = 'mainnet'; // mainnet, testnet or devnet
// Application
export const dAppName = 'DBC';
// Addresses
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqzau4u3scnqtthpu7p6fjp0fpwvpcagqtys5sezss7w';
export const distributionAddress =
  'erd1wd6ksxyzd4qge374azc2jp8pelv04g2atjeldkmc7ly7gpf3zg7qup2dns';
// Token ids
export const lkFarmsNames =
  'LKFARM-9d1ea8,EGLDMEXFL-ef2065,ITHWEGLDFL-332f38,SZPAY-9f1b39';
export const nftsCollectionId = 'DEADBROS-bf822f';
export const nftsSerumCollectionId = 'TESTSERUM-39a388'; // DEAD1-2d86a5 to test the market
export const nftsLegendaryCollectionId = 'LDB-ada909';
export const deadTokenId = 'DEADBROS-388e63'; // DEADBROS-fa8f0f in devnet
// Urls
export const deadBrothersClubUrl = 'https://www.deadbrothers.club/';
export const elrondApiUrl =
  elrondNetwork === ('devnet' as any)
    ? 'https://devnet-api.elrond.com'
    : 'https://api.elrond.com';
export const deadRareUrl = 'https://deadrare.io';
export const gatewayDeadRareUrl = 'https://gateway.deadrare.io';
export const deadRareIconUrl = process.env.PUBLIC_URL + '/deadrare.webp';
export const trustMarketUrl = 'https://trust.market';
export const gatewayTrustMarket = 'https://new-api.trust.market';
export const trustMarketIconUrl = process.env.PUBLIC_URL + '/trust.webp';
export const elrondExplorerUrl = 'https://explorer.elrond.com';
// Frame it
export const gatewayFrameIt = 'https://api.frameit.gg/api/v1/nftcollection';
export const frameItIconUrl = process.env.PUBLIC_URL + '/frameit.png';
export const frameItUrl = 'https://www.frameit.gg';
// Omniscient
export const omniscientUrl = 'https://omniscient.tools/partners/deadbrothers';
export const esdtMarketUrl = 'https://esdt.market/app/esdt/listings';
// Vote component
export const enableVote = false;
// DEVNET test
// export const voteAddress =
//   'erd1qqqqqqqqqqqqqpgqtg0q4y6m477neffqk5qn3fpa83ws0ywz0jpq0u28ke';
// export const voteYesData =
//   'ESDTTransfer@4445414442524f532d666138663066@021e19e0c9bab2400000@766f74655f796573';
// export const voteNoData =
//   'ESDTTransfer@4445414442524f532d666138663066@021e19e0c9bab2400000@766F74655F6E6F';
export const voteAddress = 'PUT VOTE SMART CONTRACT ADDRESS HERE';
export const voteYesData =
  'ESDTTransfer@4445414442524f532d626638323266@021e19e0c9bab2400000@766f74655f796573';
export const voteNoData =
  'ESDTTransfer@4445414442524f532d626638323266@021e19e0c9bab2400000@766F74655F6E6F';
export const voteFinishData = 'finish_vote';
export const voteWithdrawData = 'withdraw';
export const voteOwnerAddress =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';
// Market
// DEVNET test
// export const serumMarketAddress =
//   'erd1qqqqqqqqqqqqqpgqzyjg9jdvphvtmwn5sjjz3y0n4jafkzxr0jpqnd0uq8';
export const enableMarket = false;
export const serumMarketAddress =
  'erd1qqqqqqqqqqqqqpgqzyjg9jdvphvtmwn5sjjz3y0n4jafkzxr0jpqnd0uq8';
export const serumMarketBuyFn = 'buy';
export const serumWithdrawData = 'withdraw';
export const serumOwnerAddress =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';

// Staking
export const enableStaking = false;
export const enableTokenStaking = false;
export const tokenStakingAddress =
  'erd1qqqqqqqqqqqqqpgqhqs38zquy8e3zpfsgf46srrespmlapmv0jpqcg4np3';
export const nftStakingAddress =
  'erd1qqqqqqqqqqqqqpgqgus6jqr5vsdarny080crct0l42jwc8cu0jpqhe4u9r';
export const nftStakingCollection = 'BACKGROUND-35c061';

