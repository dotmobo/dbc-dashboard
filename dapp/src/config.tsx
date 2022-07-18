// Elrond Network
export const elrondNetwork = 'mainnet'; // mainnet, testnet or devnet
// Application
export const dAppName = 'TIKY';
export const dAppLogo = 'https://img1.wsimg.com/isteam/ip/3feb75c6-9600-42a8-86e9-4f93249163fc/FUlDDKDWAAAobne.jpg';
// Addresses
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqrwcjwp6p6scxwzmlfk7w43wglklw5n02ys5syyjd3y';
export const distributionAddress =
  'erd13z5quh3dw9lnmjxpgpazhm8wja7arjgvx23v2rdql3ex84h023jqdry5we';
export const farmsAddress =
  'erd13z5quh3dw9lnmjxpgpazhm8wja7arjgvx23v2rdql3ex84h023jqdry5we';
// Token ids
export const farmsPlanImg = '';
export const farmsGraphImg = '';
export const lkFarmsNames =
  'LKFARM-9d1ea8,EGLDMEXFL-ef2065,ITHWEGLDFL-332f38,SZPAY-9f1b39,UTKWEGLDFL-082aec';
export const nftsCollectionId =
  elrondNetwork === ('devnet' as any) ? 'BEAK-35c061' : 'TIKY-84fe8b';
export const nftsSerumCollectionId = null;
export const nftsLegendaryCollectionId = null;
export const nftsDawnCollectionId = null;
export const deadTokenId =
  elrondNetwork === ('devnet' as any) ? 'DEADBROS-fa8f0f' : 'TKDY-5fd1c0';
// Urls
export const deadBrothersClubUrl = 'https://www.deadbrothers.club/';
// Mint
export const nftsCollectionMintUrl = 'https://xoxno.com/buy/QRTS-NATIONS/Tikidy';
export const nftsCollectionMintName = 'TIKIDY';
export const nftsLegendaryCollectionMintUrl = '';
export const nftsLegendaryCollectionMintName = '';
export const nftsDawnCollectionMintUrl = '';
export const nftsDawnCollectionMintName = '';
// Api
export const elrondApiUrl =
  elrondNetwork === ('devnet' as any)
    ? 'https://devnet-api.elrond.com'
    : 'https://api.elrond.com';
export const elrondExplorerUrl =
  elrondNetwork === ('devnet' as any)
    ? 'https://devnet-explorer.elrond.com'
    : 'https://explorer.elrond.com';

// info
export const enableInfo = true;
export const enableFloorPrice = true;
export const enableStats = false;
export const enableLinks = true;

// Links
export const links = [
  { name: 'Official website', url: 'https://tikidy.club/' },
  { name: 'Twitter', url: 'https://www.twitter.com/Tikidy_NFT' },
  { name: 'Discord', url: 'https://discord.gg/4wP9hAKDv2' },
  { name: 'Linktree', url: 'https://linktr.ee/Tikidy' }
];

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
export const enableVote = false;
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
export const enableMarket = false;
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

export const shopCollectionId2 =
  elrondNetwork === ('devnet' as any) ? 'DEAD1-2d86a5' : 'TIKY-84fe8b';
export const shopMarketAddress2 =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqmdlskg8ptzsxjk7npv8fx5vdx8l3xkvs0jpq6a900y'
    : 'erd1qqqqqqqqqqqqqpgqnh9zqv73pjw7m09lflrucr7vcmx7my7u0jpqfkv7d6';
export const shopMarketBuyFn2 = 'buy';
export const shopWithdrawData2 = 'withdraw';
export const shopOwnerAddress2 =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';

// Staking
export const enableStaking = false;
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

export const nftStakingAddress3 =
  elrondNetwork === ('devnet' as any)
    ? 'erd1qqqqqqqqqqqqqpgqwvtn5jpsunya7ztlmfzv6wjt60m4tx6t0jpqhcfcww'
    : 'erd1qqqqqqqqqqqqqpgqtg0q4y6m477neffqk5qn3fpa83ws0ywz0jpq0u28ke';
export const nftStakingCollection3 =
  elrondNetwork === ('devnet' as any) ? 'BEAK-35c061' : 'DEADBROS-bf822f';

export const nftStakingOwnerAddress =
  'erd1ef2v6ls0l54zvzpqncd3t3unaycwc4a59zjr3k7x6xvc74f20jpq80knvd';
