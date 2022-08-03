import * as React from 'react';
import NftStaking from 'components/NftStaking';
import TopInfo from 'components/TopInfo';
import {
  enableNftStake1Solo1,
  enableStaking,
  nftStake1Solo1Address,
  nftStake1Solo1Collection,
  nftStake1Solo1Name
} from 'config';

const Stake1Solo1 = () => {
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
                {!!enableStaking && !!enableNftStake1Solo1 && (
                  <div>
                    <hr />
                    <NftStaking
                      name={nftStake1Solo1Name}
                      nftStakingAddress={nftStake1Solo1Address}
                      nftStakingCollection={nftStake1Solo1Collection}
                    />
                  </div>
                )}
                {(!enableStaking || !enableNftStake1Solo1) && (
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

export default Stake1Solo1;
