import * as React from 'react';
import NftStaking from 'components/NftStaking';
import TopInfo from 'components/TopInfo';
import {
  enableStaking,
  nftStake2Solo1Name,
  nftStake2Solo1Address,
  nftStake2Solo1Collection,
  enableNftStake2Solo1
} from 'config';

const Stake2Solo1 = () => {
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
                {!!enableStaking && !!enableNftStake2Solo1 && (
                  <div>
                    <hr />
                    <NftStaking
                      name={nftStake2Solo1Name}
                      nftStakingAddress={nftStake2Solo1Address}
                      nftStakingCollection={nftStake2Solo1Collection}
                    />
                  </div>
                )}
                {(!enableStaking || !enableNftStake2Solo1) && (
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

export default Stake2Solo1;
