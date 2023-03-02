import React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import * as DappUI from '@multiversx/sdk-dapp/UI';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { getTransactions } from 'apiRequests';
import TransactionsList from './TransactionsList';
import { StateType } from './types';

const Transactions = ({ contractAddress }: any) => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { success, fail, pending } = useGetActiveTransactionsStatus();

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined
  });
  const account = useGetAccountInfo();

  const fetchData = () => {
    if (success || fail || !pending) {
      getTransactions({
        apiAddress,
        address: account.address,
        timeout: 3000,
        contractAddress: contractAddress
      }).then(({ data, success: transactionsFetched }) => {
        refreshAccount();
        setState({
          transactions: data,
          transactionsFetched
        });
      });
    }
  };

  React.useEffect(fetchData, [success, fail, pending]);

  const { transactions } = state;

  return transactions.length > 0 ? (
    <TransactionsList transactions={transactions} />
  ) : (
    <div className='my-5'>
      <DappUI.PageState
        icon={faExchangeAlt}
        className='text-muted fa-3x'
        title='No Transactions'
      />
    </div>
  );
};

export default Transactions;
