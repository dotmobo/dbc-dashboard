import * as React from 'react';
import {
  deadTokenId,
  shopCollectionId1,
  shopCollectionId2,
  shopMarketAddress1,
  shopMarketAddress2,
  shopMarketBuyFn1,
  shopMarketBuyFn2,
  shopOwnerAddress1,
  shopOwnerAddress2,
  shopWithdrawData1,
  shopWithdrawData2
} from 'config';
import Shop from './Shop';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <Shop
          title="Dawn Shop"
          shopMarketAddress={shopMarketAddress1}
          shopOwnerAddress={shopOwnerAddress1}
          shopMarketBuyFn={shopMarketBuyFn1}
          shopWithdrawData={shopWithdrawData1}
          shopMarketCollectionId={shopCollectionId1}
          shopMarketTokenId={deadTokenId}
        />
        <hr />
        <Shop
          title="Partner Shop"
          shopMarketAddress={shopMarketAddress2}
          shopOwnerAddress={shopOwnerAddress2}
          shopMarketBuyFn={shopMarketBuyFn2}
          shopWithdrawData={shopWithdrawData2}
          shopMarketCollectionId={shopCollectionId2}
          shopMarketTokenId={deadTokenId}
        />
      </div>
    </div>
  );
};

export default Components;
