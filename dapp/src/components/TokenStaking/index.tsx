import * as React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core/hooks';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@elrondnetwork/erdjs';
import { faCircle, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { floor, divide } from 'mathjs';
import moment from 'moment';
import { deadTokenId, elrondExplorerUrl } from 'config';
import converter from 'hex2dec';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';

interface TokenStakingType {
  tokenStakingAddress: string;
  name: string;
}

const TokenStaking = ({ tokenStakingAddress, name }: TokenStakingType) => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  const [stakingTokenId, setStakingTokenId] = React.useState<string>();
  const [minimumStakingAmount, setMinimumStakingAmount] =
    React.useState<number>();

  const [stakeAmount, setStakeAmount] = React.useState<number>();
  const [lockTime, setLockTime] = React.useState<number>();
  const [unstakeTime, setUnstakeTime] = React.useState<number>();
  const [newStakeAmount, setNewStakeAmount] = React.useState<string>('10000');
  const [currentRewards, setCurrentRewards] = React.useState<number>();

  const [minimumStakingDays, setMinimumStakingDays] = React.useState<number>();
  const [rewardsPerDayPercent, setRewardsPerDayPercent] =
    React.useState<number>();
  const [stakingStatus, setStakingStatus] = React.useState<boolean>();

  React.useEffect(() => {
    const query = new Query({
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getStakingTokenId'),
      args: []
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setStakingTokenId(undefined);
            break;
          case '':
            setStakingTokenId('');
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString();
            setStakingTokenId(decoded);
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getMinimumStakingAmount'),
      args: []
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setMinimumStakingAmount(0);
            break;
          case '':
            setMinimumStakingAmount(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setMinimumStakingAmount(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getStakeAmount'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setStakeAmount(0);
            break;
          case '':
            setStakeAmount(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setStakeAmount(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getLockTime'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setLockTime(0);
            break;
          case '':
            setLockTime(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setLockTime(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getUnstakeTime'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setUnstakeTime(0);
            break;
          case '':
            setUnstakeTime(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setUnstakeTime(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getCurrentRewards'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setCurrentRewards(0);
            break;
          case '':
            setCurrentRewards(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setCurrentRewards(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getMinimumStakingDays'),
      args: []
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setMinimumStakingDays(0);
            break;
          case '':
            setMinimumStakingDays(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setMinimumStakingDays(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getRewardsPerDayPercent'),
      args: []
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setRewardsPerDayPercent(0);
            break;
          case '':
            setRewardsPerDayPercent(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setRewardsPerDayPercent(parseInt(decoded, 16));
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
      address: new Address(tokenStakingAddress),
      func: new ContractFunction('getStakingStatus'),
      args: []
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setStakingStatus(false);
            break;
          case '':
            setStakingStatus(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setStakingStatus(parseInt(decoded, 16) === 1 ? true : false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  function strtoHex(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  function largeNumberToHex(num: string) {
    let result = converter.decToHex(num, { prefix: false });
    if (result !== null && result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  const sendStakeTransaction = async () => {
    const stakeTransaction = {
      value: '0',
      data:
        'ESDTTransfer@' +
        strtoHex(deadTokenId) +
        '@' +
        largeNumberToHex(
          !!newStakeAmount ? newStakeAmount + '0'.repeat(18) : '0'
        ) +
        '@' +
        strtoHex('stake'),
      receiver: tokenStakingAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing stake transaction',
        errorMessage: 'An error has occured during stake',
        successMessage: 'Stake transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendUnstakeTransaction = async () => {
    const unstakeTransaction = {
      value: '0',
      data: 'unstake',
      receiver: tokenStakingAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: unstakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing unstake transaction',
        errorMessage: 'An error has occured during unstake',
        successMessage: 'Unstake transaction successful'
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

  const handleNewStakeAmountChange = (event: any) => {
    setNewStakeAmount(event.target.value);
  };

  return (
    <div>
      <h3>
        Stake {name} Tokens <FontAwesomeIcon icon={faCoins} className='text' />
      </h3>
      <div className='row'>
        <div className='col-12'>
          <span className='mr-1'>Staking address:</span>
          <span data-testid='tokenStakingAddress'>
            <a
              href={elrondExplorerUrl + '/accounts/' + tokenStakingAddress}
              target='_blank'
              rel='noopener noreferrer'
            >
              {tokenStakingAddress.substring(0, 8) +
                '...' +
                tokenStakingAddress.substring(tokenStakingAddress.length - 4)}
            </a>
          </span>
        </div>
        {stakingTokenId === undefined &&
          minimumStakingAmount === undefined &&
          minimumStakingDays === undefined &&
          rewardsPerDayPercent === undefined &&
          stakingStatus === undefined && (
            <div className='col-12 mt-3'>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        {stakingTokenId !== undefined &&
          minimumStakingAmount !== undefined &&
          minimumStakingDays !== undefined &&
          rewardsPerDayPercent !== undefined &&
          stakingStatus !== undefined && (
            <div className='col-12 mt-3'>
              <h4>Staking details</h4>
              <div className='mr-1'>
                Running:{' '}
                {stakingStatus ? (
                  <FontAwesomeIcon icon={faCircle} className='running-on' />
                ) : (
                  <FontAwesomeIcon icon={faCircle} className='running-off' />
                )}
              </div>
              <div className='mr-1'>Token: {stakingTokenId}</div>
              <div className='mr-1'>
                Minimum staking amount:&nbsp;
                {formatBigNumber(
                  floor(divide(minimumStakingAmount, 10 ** 18), 2) as any
                )}
              </div>
              <div className='mr-1'>
                Minimum staking days: {minimumStakingDays}
              </div>
              <div className='mr-1'>
                Rewards per day: {rewardsPerDayPercent}%
              </div>
            </div>
          )}
        {stakeAmount === undefined &&
          lockTime === undefined &&
          unstakeTime === undefined &&
          currentRewards === undefined && (
            <div className='col-12 mt-3'>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        {stakeAmount !== undefined &&
          lockTime !== undefined &&
          unstakeTime !== undefined &&
          currentRewards !== undefined && (
            <div className='col-12 mt-3'>
              <h4>My staking</h4>
              <div className='mr-1'>
                Staked amount:&nbsp;
                {formatBigNumber(
                  floor(divide(stakeAmount, 10 ** 18), 2) as any
                )}
              </div>
              <div className='mr-1'>
                Lock time:&nbsp;
                {moment.unix(lockTime).format('MMMM Do YYYY, h:mm:ss a')}
              </div>
              <div className='mr-1'>
                Unstake time:&nbsp;
                {moment.unix(unstakeTime).format('MMMM Do YYYY, h:mm:ss a')}
              </div>
              <div className='mr-1'>
                Current rewards:&nbsp;
                {formatBigNumber(
                  floor(divide(currentRewards, 10 ** 18), 2) as any
                )}
                &nbsp;$DEAD
              </div>
            </div>
          )}
        {stakeAmount !== undefined &&
          lockTime !== undefined &&
          unstakeTime !== undefined &&
          !hasPendingTransactions && (
            <div className='mt-3 col-12'>
              {stakeAmount === 0 && (
                <div>
                  <input
                    type='text'
                    className='form-control mb-3'
                    value={newStakeAmount}
                    onChange={handleNewStakeAmountChange}
                    onKeyPress={(event) => {
                      if (!/\d/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <button
                    onClick={sendStakeTransaction}
                    className='btn btn-primary mr-4'
                  >
                    STAKE
                  </button>
                </div>
              )}
              {stakeAmount !== 0 && (
                <div>
                  <button
                    onClick={sendUnstakeTransaction}
                    className='btn btn-primary mr-4 mt-2'
                  >
                    CLAIM + UNSTAKE
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default TokenStaking;
