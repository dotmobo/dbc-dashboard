import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import {
  contractAddress,
  elrondExplorerUrl,
  distributionAddress
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
      <div className='mb-1'>
        <span className='mr-1'>Contract address:</span>
        <span data-testid='contractAddress'>
          <a
            className='addressLink'
            href={elrondExplorerUrl + '/accounts/' + contractAddress}
            target='_blank'
            rel='noopener noreferrer'
          >
            {contractAddress.substring(0, 8) +
              '...' +
              contractAddress.substring(contractAddress.length - 4)}
          </a>
        </span>
      </div>
      <div className='mb-1'>
        <span className='mr-1'>Distribution address:</span>
        <span data-testid='distributionAddress'>
          <a
            className='addressLink'
            href={elrondExplorerUrl + '/accounts/' + distributionAddress}
            target='_blank'
            rel='noopener noreferrer'
          >
            {distributionAddress.substring(0, 8) +
              '...' +
              distributionAddress.substring(distributionAddress.length - 4)}
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
