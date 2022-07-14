import * as React from 'react';
import {
  enableStaking,
  nftStakingAddress3,
  nftStakingCollection3
} from 'config';
import TopInfo from 'components/TopInfo';
import NftStaking from 'components/NftStaking';

const StakeGenesis = () => {
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
                {!!enableStaking && (
                  <div>
                    <hr />
                    <NftStaking
                      name='#Genesis DB'
                      nftStakingAddress={nftStakingAddress3}
                      nftStakingCollection={nftStakingCollection3}
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

export default StakeGenesis;
