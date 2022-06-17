import * as React from 'react';
import {
  refreshAccount,
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import {
  faCircleQuestion,
  faPersonBooth,
  faCheckCircle,
  faArrowDown,
  faXmarkCircle,
  faCircleStop,
  faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { divide, floor } from 'mathjs';
import { ProgressBar } from 'react-bootstrap';
import { elrondExplorerUrl } from 'config';

interface VoteType {
  voteAddress: string;
  voteOwnerAddress: string;
  voteYesData: string;
  voteNoData: string;
  voteFinishData: string;
  voteWithdrawData: string;
}

const Vote = ({
  voteAddress,
  voteOwnerAddress,
  voteYesData,
  voteNoData,
  voteFinishData,
  voteWithdrawData
}: VoteType) => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const [question, setQuestion] = React.useState<string>();
  const [inProgress, setInProgress] = React.useState<number>();
  const [yes, setYes] = React.useState<number>();
  const [no, setNo] = React.useState<number>();
  const [myAmount, setMyAmount] = React.useState<number>();

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

  React.useEffect(() => {
    const query = new Query({
      address: new Address(voteAddress),
      func: new ContractFunction('getMyAmount'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setMyAmount(0);
            break;
          case '':
            setMyAmount(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setMyAmount(parseInt(decoded, 16));
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
      data: voteYesData,
      receiver: voteAddress,
      gasLimit: '5000000'
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
      data: voteNoData,
      receiver: voteAddress,
      gasLimit: '5000000'
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

  const sendFinishTransaction = async () => {
    const finishTransaction = {
      value: '0',
      data: voteFinishData,
      receiver: voteAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: finishTransaction,
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

  const sendWithdrawTransaction = async () => {
    const withdrawTransaction = {
      value: '0',
      data: voteWithdrawData,
      receiver: voteAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: withdrawTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing withdraw transaction',
        errorMessage: 'An error has occured during withdraw',
        successMessage: 'Withdraw transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };
  const sendWithdrawMyAmountTransaction = async () => {
    const withdrawMyAmountTransaction = {
      value: '0',
      data: 'withdraw_my_amount',
      receiver: voteAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: withdrawMyAmountTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing withdraw my amount transaction',
        errorMessage: 'An error has occured during withdraw my amount',
        successMessage: 'Withdraw transaction successful'
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
        DAO Vote <FontAwesomeIcon icon={faPersonBooth} className='text' />
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
          {yes !== undefined && no !== undefined && (
            <ProgressBar className='mt-2'>
              <ProgressBar
                key={1}
                variant='success'
                now={divide(yes, yes + no) * 100}
                label={`${floor(divide(yes, 10 ** 18), 2) as any}`}
              />
              <ProgressBar
                key={2}
                variant='danger'
                now={divide(no, yes + no) * 100}
                label={`${floor(divide(no, 10 ** 18), 2) as any}`}
              />
            </ProgressBar>
          )}
          <div className='mt-4'>
            {!hasPendingTransactions && inProgress === 1 && (
              <div className='row'>
                <div className='col-3'>
                  <button
                    onClick={sendYesTransaction}
                    className='btn btn-success'
                    disabled={inProgress !== 1}
                  >
                    YES&nbsp;
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </button>
                </div>
                <div className='col-3'>
                  <button
                    onClick={sendNoTransaction}
                    className='btn btn-danger'
                    disabled={inProgress !== 1}
                  >
                    NO&nbsp;
                    <FontAwesomeIcon icon={faXmarkCircle} />
                  </button>
                </div>
              </div>
            )}
            {!hasPendingTransactions &&
              inProgress === 0 &&
              myAmount !== undefined &&
              myAmount !== 0 && (
                <div className='row'>
                  <div className='col-3'>
                    <button
                      onClick={sendWithdrawMyAmountTransaction}
                      className='btn btn-primary'
                      disabled={inProgress !== 0}
                    >
                      WITHDRAW{' '}
                      {formatBigNumber(
                        floor(divide(myAmount, 10 ** 18), 2) as any
                      )}{' '}
                      $DEAD&nbsp;
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
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
            {address !== undefined &&
              address === voteOwnerAddress &&
              !hasPendingTransactions && (
                <div className='mt-4'>
                  <button
                    onClick={sendFinishTransaction}
                    className='btn btn-primary mr-4'
                    disabled={inProgress !== 1}
                  >
                    FINISH&nbsp;
                    <FontAwesomeIcon icon={faCircleStop} />
                  </button>
                </div>
              )}
            {address !== undefined &&
              address === voteOwnerAddress &&
              !hasPendingTransactions && (
                <div className='mt-4'>
                  <button
                    onClick={sendWithdrawTransaction}
                    className='btn btn-primary mr-4'
                    disabled={inProgress !== 0}
                  >
                    WITHDRAW&nbsp;
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
