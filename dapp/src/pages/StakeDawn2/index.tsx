import * as React from 'react';
import {
  enableStaking,
  enableTokenStaking,
  nftStakingAddress,
  nftStakingAddress4,
  nftStakingCollection,
  nftStakingCollection4,
  tokenStakingAddress
} from 'config';
import TopInfo from 'components/TopInfo';
import NftStaking from 'components/NftStaking';
import TokenStaking from 'components/TokenStaking';

const StakeDawn2 = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                </div>
              </div>
              <div className='col mt-4 col-md-12'>
                {enableTokenStaking && (
                  <div>
                    <hr />
                    <TokenStaking tokenStakingAddress={tokenStakingAddress} />
                  </div>
                )}
                {!!enableStaking && (
                  <div>
                    <hr />
                    <NftStaking
                      name='#Dawn DB'
                      nftStakingAddress={nftStakingAddress4}
                      nftStakingCollection={nftStakingCollection4}
                    />
                  </div>
                )}
                {!enableStaking && (
                  <div>
                    <hr />
                    <p>Staking is not currently available !</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeDawn2;
