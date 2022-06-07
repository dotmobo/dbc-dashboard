import {
  enableTokenStaking,
  nftStakingAddress,
  nftStakingCollection,
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
          nftStakingAddress={nftStakingAddress}
          nftStakingCollection={nftStakingCollection}
        />
      </div>
    </div>
  );
};

export default Components;
