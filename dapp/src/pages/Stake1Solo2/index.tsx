import * as React from 'react';
import NftStaking from 'components/NftStaking';
import TopInfo from 'components/TopInfo';
import {
  enableStaking,
  nftStake1Solo2Name,
  nftStake1Solo2Address,
  nftStake1Solo2Collection,
  enableNftStake1Solo2
} from 'config';

const Stake1Solo2 = () => {
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
                {!!enableStaking && !!enableNftStake1Solo2 && (
                  <div>
                    <hr />
                    <NftStaking
                      name={nftStake1Solo2Name}
                      nftStakingAddress={nftStake1Solo2Address}
                      nftStakingCollection={nftStake1Solo2Collection}
                    />
                  </div>
                )}
                {(!enableStaking || !enableNftStake1Solo2) && (
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

export default Stake1Solo2;
