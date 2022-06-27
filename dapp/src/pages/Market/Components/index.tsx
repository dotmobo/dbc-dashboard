import * as React from 'react';
import {
  deadTokenId,
  shopCollectionId1,
  shopMarketAddress1,
  shopMarketBuyFn1,
  shopOwnerAddress1,
  shopWithdrawData1
} from 'config';
import Shop from './Shop';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <Shop
          shopMarketAddress={shopMarketAddress1}
          shopOwnerAddress={shopOwnerAddress1}
          shopMarketBuyFn={shopMarketBuyFn1}
          shopWithdrawData={shopWithdrawData1}
          shopMarketCollectionId={shopCollectionId1}
          shopMarketTokenId={deadTokenId}
        />
      </div>
    </div>
  );
};

export default Components;
