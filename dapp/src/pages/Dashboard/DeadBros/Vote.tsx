import * as React from 'react';
import {
  refreshAccount,
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core';
import {
  deadTokenId,
  elrondApiUrl,
  elrondExplorerUrl,
  voteAddress
} from 'config';
import axios from 'axios';

import {
  faCircleQuestion,
  faPersonBooth,
  faCheckCircle,
  faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import { divide, floor } from 'mathjs';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';

const Vote = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const [question, setQuestion] = React.useState<string>();
  const [inProgress, setInProgress] = React.useState<number>();
  const [yes, setYes] = React.useState<number>();
  const [no, setNo] = React.useState<number>();

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(voteAddress),
      func: new ContractFunction('getQuestion'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setQuestion('');
            break;
          case '':
            setQuestion('');
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString();
            setQuestion(decoded);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(voteAddress),
      func: new ContractFunction('getInProgress'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setInProgress(0);
            break;
          case '':
            setInProgress(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setInProgress(parseInt(decoded, 16));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(voteAddress),
      func: new ContractFunction('getYes'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setYes(0);
            break;
          case '':
            setYes(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setYes(parseInt(decoded, 16));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(voteAddress),
      func: new ContractFunction('getNo'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setNo(0);
            break;
          case '':
            setNo(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setNo(parseInt(decoded, 16));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  const { sendTransactions } = transactionServices;

  const sendYesTransaction = async () => {
    const yesTransaction = {
      value: '0',
      data: 'ESDTTransfer@5745422d356430386265@02540be400@766f74655f796573',
      receiver: voteAddress
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: yesTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing yes vote transaction',
        errorMessage: 'An error has occured during yes vote',
        successMessage: 'Yes vote transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendNoTransaction = async () => {
    const noTransaction = {
      value: '0',
      data: 'ESDTTransfer@5745422d356430386265@02540be400@766f74655f796573',
      receiver: voteAddress
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: noTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing no vote transaction',
        errorMessage: 'An error has occured during no vote',
        successMessage: 'No vote transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <h3>
        My Vote <FontAwesomeIcon icon={faPersonBooth} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {question === undefined ||
            (inProgress === undefined && (
              <div>
                <div className='spinner-border text-primary mr-2' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ))}
          {question !== undefined && inProgress !== undefined && (
            <div>
              <FontAwesomeIcon icon={faCircleQuestion} className='text mr-1' />
              <b>Question</b>:&nbsp;
              {question}
              {inProgress === 1 && (
                <div>
                  <i>Vote in progress...</i>
                </div>
              )}
              {inProgress === 0 && (
                <div>
                  <i>Vote finished !</i>
                </div>
              )}
            </div>
          )}
          <div className='mt-4'>
            {!hasPendingTransactions && (
              <div>
                <button
                  onClick={sendYesTransaction}
                  className='btn btn-primary mr-4'
                  disabled={inProgress !== 1}
                >
                  YES&nbsp;
                  <FontAwesomeIcon icon={faCheckCircle} />
                </button>
                {yes !== undefined && (
                  //   <i>{floor(divide(yes, 10 ** 18), 2) as any} $DEAD</i>
                  <i>{yes} $DEAD</i>
                )}
              </div>
            )}
            {!hasPendingTransactions && (
              <div className='mt-4'>
                <button
                    onClick={sendNoTransaction}
                  className='btn btn-primary mr-4'
                  disabled={inProgress !== 1}
                >
                  NO&nbsp;
                  <FontAwesomeIcon icon={faXmarkCircle} />
                </button>
                {no !== undefined && (
                  //   <i>{floor(divide(no, 10 ** 18), 2) as any} $DEAD</i>
                  <i>{no} $DEAD</i>
                )}
              </div>
            )}
            <div className='mb-1 mt-4'>
              <span className='mr-1'>Vote address:</span>
              <span data-testid='voteAddress'>
                <a
                  href={elrondExplorerUrl + '/accounts/' + voteAddress}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {voteAddress.substring(0, 8) +
                    '...' +
                    voteAddress.substring(voteAddress.length - 4)}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
