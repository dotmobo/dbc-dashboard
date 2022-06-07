import * as React from 'react';
import {
  deadTokenId,
  nftsSerumCollectionId,
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
          serumMarketCollectionId={nftsSerumCollectionId}
          serumMarketTokenId={deadTokenId}
        />
      </div>
    </div>
  );
};

export default Components;
