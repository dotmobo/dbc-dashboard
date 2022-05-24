import * as React from 'react';
import TopInfo from './TopInfo';
import Transactions from './Transactions';
import Components from './Components';
import { enableStaking } from 'config';

const Stake = () => {
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
              {!!enableStaking && (
                <div>
                  <Components />
                  <Transactions />
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
  );
};

export default Stake;
