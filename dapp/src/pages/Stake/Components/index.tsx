import { enableTokenStaking } from 'config';
import * as React from 'react';
import NftStaking from './NftStaking';
import TokenStaking from './TokenStaking';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        {enableTokenStaking && (
          <div>
            <hr />
            <TokenStaking />
          </div>
        )}
        <hr />
        <NftStaking />
      </div>
    </div>
  );
};

export default Components;
