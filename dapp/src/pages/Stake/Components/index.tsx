import {
  enableTokenStaking,
  nftStakingAddress,
  nftStakingAddress2,
  nftStakingCollection,
  nftStakingCollection2,
  tokenStakingAddress
} from 'config';
import * as React from 'react';
import NftStaking from './NftStaking';
import TokenStaking from './TokenStaking';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        {enableTokenStaking && (
          <div>
            <hr />
            <TokenStaking tokenStakingAddress={tokenStakingAddress}/>
          </div>
        )}
        <hr />
        <NftStaking
          name="#Dawn DB"
          nftStakingAddress={nftStakingAddress}
          nftStakingCollection={nftStakingCollection}
        />
        <hr />
        <NftStaking
          name="#Legendary DB"
          nftStakingAddress={nftStakingAddress2}
          nftStakingCollection={nftStakingCollection2}
        />
      </div>
    </div>
  );
};

export default Components;
