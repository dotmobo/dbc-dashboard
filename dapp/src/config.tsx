// Elrond Network
export const elrondNetwork = 'mainnet'; // mainnet, testnet or devnet
// Application
export const dAppName = 'DBC';
export const dAppLogo = process.env.PUBLIC_URL + '/new-logo-db.png';
// Addresses
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqzau4u3scnqtthpu7p6fjp0fpwvpcagqtys5sezss7w';
export const distributionAddress =
  'erd1wd6ksxyzd4qge374azc2jp8pelv04g2atjeldkmc7ly7gpf3zg7qup2dns';
// Token ids
export const lkFarmsNames =
  'LKFARM-9d1ea8,EGLDMEXFL-ef2065,ITHWEGLDFL-332f38,SZPAY-9f1b39,UTKWEGLDFL-082aec';
export const nftsCollectionId =
  elrondNetwork === ('devnet' as any) ? 'BEAK-35c061' : 'DEADBROS-bf822f';
export const nftsSerumCollectionId =
  elrondNetwork === ('devnet' as any) ? 'DEAD1-2d86a5' : 'TESTSERUM-39a388';
export const nftsLegendaryCollectionId =
  elrondNetwork === ('devnet' as any) ? 'CLOTHES-35c061' : 'LDB-ada909';
export const nftsDawnCollectionId =
  elrondNetwork === ('devnet' as any) ? 'BACKGROUND-35c061' : 'DAWNBROS-09395f';
export const deadTokenId =
  elrondNetwork === ('devnet' as any) ? 'DEADBROS-fa8f0f' : 'DEADBROS-388e63';
// Urls
export const deadBrothersClubUrl = 'https://www.deadbrothers.club/';
// Api
export const elrondApiUrl =
  elrondNetwork === ('devnet' as any)
    ? 'https://devnet-api.elrond.com'
    : 'https://api.elrond.com';
export const elrondExplorerUrl =
  elrondNetwork === ('devnet' as any)
    ? 'https://devnet-explorer.elrond.com'
    : 'https://explorer.elrond.com';
// deadrare and trustmarket
export const deadRareUrl = 'https://deadrare.io';
export const gatewayDeadRareUrl = 'https://gateway.deadrare.io';
export const deadRareIconUrl = process.env.PUBLIC_URL + '/deadrare.webp';
export const trustMarketUrl = 'https://xoxno.com';
export const gatewayTrustMarket = 'https://xoxnoapi.azureedge.net';
export const trustMarketIconUrl = process.env.PUBLIC_URL + '/trust.png';
// Frame it
export const gatewayFrameIt = 'https://api.frameit.gg/api/v1/nftcollection';
export const frameItIconUrl = process.env.PUBLIC_URL + '/frameit.png';
export const frameItUrl = 'https://www.frameit.gg';
// Omniscient
export const omniscientUrl1 = 'https://omniscient.tools/partners/deadbrothers';
export const omniscientUrl2 = 'https://omniscient.tools/partners/dawn';
// Esdt market
export const esdtMarketUrl = 'https://esdt.market/app/esdt/listings';

// Vote component
export const enableVote = true;
export const voteAddress =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqtg0q4y6m477neffqk5qn3fpa83ws0ywz0jpq0u28ke'
    : 'erd1qqqqqqqqqqqqqpgqldq8xj8zvzqyhvsjpsjq2k3z64ky6cqq0jpqty60v5';
export const voteAddress2 =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqqwz83uqnh2gcjylscwv088f364y9dmn70jpqz8w7dj'
    : 'PUT_YOUR_ADDRESS_HERE';
export const voteYesData = 'vote_yes';
export const voteNoData = 'vote_no';
export const voteFinishData = 'finish_vote';
export const voteWithdrawData = 'withdraw';
export const voteOwnerAddress =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';

// Market
export const enableMarket = true;
export const shopCollectionId1 =
  elrondNetwork === ('devnet' as any) ? 'DEAD1-2d86a5' : 'DAWNBROS-09395f';
export const shopMarketAddress1 =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqzyjg9jdvphvtmwn5sjjz3y0n4jafkzxr0jpqnd0uq8'
    : 'erd1qqqqqqqqqqqqqpgqhp0pexfxwurwqhx0ur2h8mytvag5q9mn0jpqevrscq';
export const shopMarketBuyFn1 = 'buy';
export const shopWithdrawData1 = 'withdraw';
export const shopOwnerAddress1 =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';

// Staking
export const enableStaking = true;
export const enableTokenStaking = false;
export const tokenStakingAddress =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqhqs38zquy8e3zpfsgf46srrespmlapmv0jpqcg4np3'
    : 'SMART-CONTRACT-ADDRESS-FOR-TOKEN-STAKING';
export const nftStakingAddress =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqgus6jqr5vsdarny080crct0l42jwc8cu0jpqhe4u9r'
    : 'erd1qqqqqqqqqqqqqpgqdfjx4p3lld506l9uvurcz3z38wckqtjz0jpqygvq5m';
export const nftStakingCollection =
  elrondNetwork === ('devnet' as any) ? 'BACKGROUND-35c061' : 'DAWNBROS-09395f';

export const nftStakingAddress2 =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgq790zcu9yw5j4ex3v0nkpvwwuf2fty98v0jpqzyj5ym'
    : 'erd1qqqqqqqqqqqqqpgq77adynv9m2hjjt2dst6vc9wzuxhlvq8a0jpqv845xj';
export const nftStakingCollection2 =
  elrondNetwork === ('devnet' as any) ? 'CLOTHES-35c061' : 'LDB-ada909';

export const nftStakingOwnerAddress =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';
