import * as React from 'react';
import {
  enableStaking,
  nftStakingAddress5,
  nftStakingCollection5,
} from 'config';
import TopInfo from 'components/TopInfo';
import MultipleNftStaking from 'components/MultipleNftStaking';
const StakeDawn3 = () => {
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
                    <MultipleNftStaking
                      name='Multiple #Dawn DB'
                      nftStakingAddress={nftStakingAddress5}
                      nftStakingCollection={nftStakingCollection5}
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

export default StakeDawn3;
