import * as React from 'react';
import {
  deadTokenId,
  enableShop1,
  enableShop2,
  shopMarketAddress1,
  shopMarketAddress2,
  shopMarketBuyFn1,
  shopMarketBuyFn2,
  shopMarketCurrency1,
  shopMarketCurrency2,
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
        {enableShop1 && (
          <div>
            <hr />
            <Shop
              title='Main Shop'
              currency={shopMarketCurrency1}
              shopMarketAddress={shopMarketAddress1}
              shopOwnerAddress={shopOwnerAddress1}
              shopMarketBuyFn={shopMarketBuyFn1}
              shopWithdrawData={shopWithdrawData1}
              shopMarketTokenId={deadTokenId}
            />
          </div>
        )}
        {enableShop2 && (
          <div>
            <hr />
            <Shop
              title='Partner Shop'
              currency={shopMarketCurrency2}
              shopMarketAddress={shopMarketAddress2}
              shopOwnerAddress={shopOwnerAddress2}
              shopMarketBuyFn={shopMarketBuyFn2}
              shopWithdrawData={shopWithdrawData2}
              shopMarketTokenId={deadTokenId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Components;
