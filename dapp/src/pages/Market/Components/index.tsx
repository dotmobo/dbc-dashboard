import * as React from 'react';
import {
  serumMarketAddress,
  serumMarketBuyFn,
  serumOwnerAddress,
  serumWithdrawData
} from 'config';
import Serum from './Serum';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <Serum
          serumMarketAddress={serumMarketAddress}
          serumOwnerAddress={serumOwnerAddress}
          serumMarketBuyFn={serumMarketBuyFn}
          serumWithdrawData={serumWithdrawData}
        />
        <hr />
        <Serum
          serumMarketAddress={serumMarketAddress}
          serumOwnerAddress={serumOwnerAddress}
          serumMarketBuyFn={serumMarketBuyFn}
          serumWithdrawData={serumWithdrawData}
        />
        <hr />
        <Serum
          serumMarketAddress={serumMarketAddress}
          serumOwnerAddress={serumOwnerAddress}
          serumMarketBuyFn={serumMarketBuyFn}
          serumWithdrawData={serumWithdrawData}
        />
      </div>
    </div>
  );
};

export default Components;
