import * as React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import * as DappUI from '@multiversx/sdk-dapp/UI';
import {
  elrondExplorerUrl,
} from 'config';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-1'>
        <span className='mr-1'>Your address:</span>
        <span data-testid='accountAddress'>
          <a
            className='addressLink'
            href={elrondExplorerUrl + '/accounts/' + address}
            target='_blank'
            rel='noopener noreferrer'
          >
            {address.substring(0, 8) +
              '...' +
              address.substring(address.length - 4)}
          </a>
        </span>
      </div>
      {/* <div>
        <h3 className='py-2'>
          <DappUI.Denominate value={account.balance} data-testid='balance' />
        </h3>
      </div> */}
    </div>
  );
};

export default TopInfo;
