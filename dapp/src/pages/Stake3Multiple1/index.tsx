import * as React from 'react';
import MultipleNftStaking from 'components/MultipleNftStaking';
import TopInfo from 'components/TopInfo';
import {
  enableStaking,
  nftStake3Multiple1Name,
  nftStake3Multiple1Address,
  nftStake3Multiple1Collection,
  enableNftStake3Multiple1,
  nftStake3Multiple1Currency
} from 'config';

const Stake3Multiple1 = () => {
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
                {!!enableStaking && !!enableNftStake3Multiple1 && (
                  <div>
                    <hr />
                    <MultipleNftStaking
                      name={nftStake3Multiple1Name}
                      currency={nftStake3Multiple1Currency}
                      nftStakingAddress={nftStake3Multiple1Address}
                      nftStakingCollection={nftStake3Multiple1Collection}
                    />
                  </div>
                )}
                {(!enableStaking || !enableNftStake3Multiple1) && (
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

export default Stake3Multiple1;
