import * as React from 'react';
import {
  enableStaking,
  nftStake3Solo1Name,
  nftStake3Solo1Address,
  nftStake3Solo1Collection,
  enableNftStake3Solo1
} from 'config';
import TopInfo from 'components/TopInfo';
import NftStaking from 'components/NftStaking';

const Stake3Solo1 = () => {
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
                {!!enableStaking && !!enableNftStake3Solo1 && (
                  <div>
                    <hr />
                    <NftStaking
                      name={nftStake3Solo1Name}
                      nftStakingAddress={nftStake3Solo1Address}
                      nftStakingCollection={nftStake3Solo1Collection}
                    />
                  </div>
                )}
                {(!enableStaking || !enableNftStake3Solo1) && (
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

export default Stake3Solo1;
