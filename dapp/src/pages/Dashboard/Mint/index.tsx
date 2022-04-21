import * as React from 'react';
import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contractAddress } from 'config';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';

const Mint = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  // TODO we need to know the TM source code to decode SC reponse of getListings ...
  // React.useEffect(() => {
  //   const query = new Query({
  //     address: new Address(contractAddress),
  //     func: new ContractFunction('getListings'),
  //     args: []
  //   });
  //   const proxy = new ProxyProvider(network.apiAddress);
  //   proxy
  //     .queryContract(query)
  //     .then(({ returnData }) => {
  //       const [encoded] = returnData;
  //       switch (encoded) {
  //         case undefined:
  //           console.log('UNDEFINED');
  //           break;
  //         case '':
  //           console.log('EMPTY');
  //           break;
  //         default: {
  //           const decoded = Buffer.from(encoded, 'base64').toString('hex');
  //           console.log(decoded);
  //           break;
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Unable to call VM query', err);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { sendTransactions } = transactionServices;

  const sendMintTransaction = async () => {
    const mintTransaction = {
      value: '300000000000000000',
      data: 'buy@4465616442726f7468657273@01',
      receiver: contractAddress
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: mintTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occured during Mint',
        successMessage: 'Mint transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='d-flex mt-4 justify-content-center'>
      {!hasPendingTransactions && (
        <div className='action-btn' onClick={sendMintTransaction}>
          <button className='btn'>
            <FontAwesomeIcon icon={faArrowUp} className='text-primary' />
          </button>
          <a href='/' className='text-white text-decoration-none'>
            Mint
          </a>
        </div>
      )}
    </div>
  );
};

export default Mint;
