import * as React from 'react';
import MultipleNftStaking from 'components/MultipleNftStaking';
import TopInfo from 'components/TopInfo';
import {
  enableStaking,
  nftStake1Multiple1Name,
  nftStake1Multiple1Address,
  nftStake1Multiple1Collection,
  enableNftStake1Multiple1,
  nftStake1Multiple1Currency
} from 'config';

const Stake1Multiple1 = () => {
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
                {!!enableStaking && !!enableNftStake1Multiple1 && (
                  <div>
                    <hr />
                    <MultipleNftStaking
                      name={nftStake1Multiple1Name}
                      currency={nftStake1Multiple1Currency}
                      nftStakingAddress={nftStake1Multiple1Address}
                      nftStakingCollection={nftStake1Multiple1Collection}
                    />
                  </div>
                )}
                {(!enableStaking || !enableNftStake1Multiple1) && (
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

export default Stake1Multiple1;
