import * as React from 'react';
import {
  refreshAccount,
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core';
import { elrondApiUrl, elrondExplorerUrl } from 'config';
import axios from 'axios';

import {
  faDollarSign,
  faSkull,
  faArrowDown,
  faArrowUp,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadIcon } from '../../assets/img/dead.svg';
import { floor, divide } from 'mathjs';
import { orderBy, shuffle } from 'lodash-es';
import LazyLoad from 'react-lazyload';
import {
  Address,
  AddressValue,
  BytesValue,
  ContractFunction,
  Query
} from '@elrondnetwork/erdjs';
import moment from 'moment';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';

interface Bro {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
}

export type TBrosList = Bro[];

interface NftStakingType {
  name: string;
  nftStakingAddress: string;
  nftStakingCollection: string;
}

const NftStaking = ({
  name,
  nftStakingAddress,
  nftStakingCollection
}: NftStakingType) => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  const [bros, setBrosList] = React.useState<TBrosList>();
  const [stakeds, setStakedsList] = React.useState<Bro[]>();
  const [minimumStakingDays, setMinimumStakingDays] = React.useState<number>();
  const [rewardsTokenAmountPerDay, setRewardsTokenAmountPerDay] =
    React.useState<number>();
  const [lockTime, setLockTime] = React.useState<number>();
  const [unstakeTime, setUnstakeTime] = React.useState<number>();
  const [currentRewards, setCurrentRewards] = React.useState<number>();
  const [stakingStatus, setStakingStatus] = React.useState<boolean>();
  const [rewardsTokenTotalSupply, setRewardsTokenTotalSupply] =
    React.useState<number>();
  const [nbrOfStakers, setNbrOfStakers] = React.useState<number>();
  const [nftNonce, setNftNonce] = React.useState<number>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${elrondApiUrl}/accounts/${nftStakingAddress}/nfts?size=10000&collections=${nftStakingCollection}`
      )
      .then((response) => {
        setStakedsList(response.data);
      });
  }, [hasPendingTransactions]);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${elrondApiUrl}/accounts/${address}/nfts?size=10000&collections=${nftStakingCollection}`
      )
      .then((response) => {
        setBrosList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, [hasPendingTransactions]);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(nftStakingAddress),
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

  React.useEffect(() => {
    const query = new Query({
      address: new Address(nftStakingAddress),
      func: new ContractFunction('getRewardsTokenTotalSupply'),
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
            setRewardsTokenTotalSupply(0);
            break;
          case '':
            setRewardsTokenTotalSupply(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setRewardsTokenTotalSupply(parseInt(decoded, 16));
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
      address: new Address(nftStakingAddress),
      func: new ContractFunction('getNbrOfStakers'),
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
            setNbrOfStakers(0);
            break;
          case '':
            setNbrOfStakers(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setNbrOfStakers(parseInt(decoded, 16));
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
      address: new Address(nftStakingAddress),
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
      address: new Address(nftStakingAddress),
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
      address: new Address(nftStakingAddress),
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
      address: new Address(nftStakingAddress),
      func: new ContractFunction('getRewardsTokenAmountPerDay'),
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
            setRewardsTokenAmountPerDay(0);
            break;
          case '':
            setRewardsTokenAmountPerDay(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setRewardsTokenAmountPerDay(parseInt(decoded, 16));
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
      address: new Address(nftStakingAddress),
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
      address: new Address(nftStakingAddress),
      func: new ContractFunction('getNftNonce'),
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
            setNftNonce(0);
            break;
          case '':
            setNftNonce(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setNftNonce(parseInt(decoded, 16));
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

  function numtoHex(num: number) {
    let result = num.toString(16);
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const { sendTransactions } = transactionServices;

  const sendStakeTransaction = async (bro: Bro) => {
    const stakeTransaction = {
      value: '0',
      data:
        'ESDTNFTTransfer@' +
        strtoHex(bro.collection) +
        '@' +
        numtoHex(bro.nonce) +
        '@' +
        numtoHex(1) +
        '@' +
        new Address(nftStakingAddress).hex() +
        '@' +
        strtoHex('stake'),
      receiver: address,
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

  const sendClaimTransaction = async () => {
    const claimTransaction = {
      value: '0',
      data: 'claim',
      receiver: nftStakingAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claim transaction',
        errorMessage: 'An error has occured during claim',
        successMessage: 'Claim transaction successful'
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
      receiver: nftStakingAddress,
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

  return (
    <div>
      <h3>
        Stake a {name} <FontAwesomeIcon icon={faSkull} className='text' />
      </h3>
      <div className='row'>
        <div className='col-12'>
          <span className='mr-1'>Nft staking address:</span>
          <span data-testid='nftStakingAddress'>
            <a
              href={elrondExplorerUrl + '/accounts/' + nftStakingAddress}
              target='_blank'
              rel='noopener noreferrer'
            >
              {nftStakingAddress.substring(0, 8) +
                '...' +
                nftStakingAddress.substring(nftStakingAddress.length - 4)}
            </a>
          </span>
        </div>
      </div>
      <div className='row mt-3'>
        {minimumStakingDays === undefined &&
          rewardsTokenAmountPerDay === undefined &&
          stakingStatus === undefined &&
          rewardsTokenTotalSupply === undefined &&
          nbrOfStakers === undefined && (
            <div className='col'>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        {minimumStakingDays !== undefined &&
          rewardsTokenAmountPerDay !== undefined &&
          stakingStatus !== undefined &&
          rewardsTokenTotalSupply !== undefined &&
          nbrOfStakers !== undefined && (
            <div className='col'>
              <div className='card'>
                <div className='card-header'>
                  Running:&nbsp;
                  {stakingStatus ? (
                    <FontAwesomeIcon icon={faCircle} className='running-on' />
                  ) : (
                    <FontAwesomeIcon icon={faCircle} className='running-off' />
                  )}
                </div>
                <div className='card-body'>
                  <div className='card-text'>
                    Remaining supply:&nbsp;
                    {formatBigNumber(
                      floor(divide(rewardsTokenTotalSupply, 10 ** 18), 2) as any
                    )}
                    &nbsp;$DEAD
                    <DeadIcon className='mx-1' height={16} width={16} />
                  </div>
                  <div className='card-text'>
                    Rewards per day:&nbsp;
                    {formatBigNumber(
                      floor(
                        divide(rewardsTokenAmountPerDay, 10 ** 18),
                        2
                      ) as any
                    )}
                    &nbsp;$DEAD
                    <DeadIcon className='mx-1' height={16} width={16} />
                  </div>
                  <div className='card-text'>
                    Minimum staking days: {minimumStakingDays}
                  </div>
                </div>
                <div className='card-footer'>
                  <small className='text-muted'>
                    {nbrOfStakers} stakers in the pool
                  </small>
                </div>
              </div>
            </div>
          )}
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <h4>Staked {name}</h4>
        </div>
        {stakeds === undefined && nftNonce === undefined && (
          <div className='col'>
            <div className='spinner-border text-primary mr-2' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {stakeds !== undefined &&
          nftNonce !== undefined &&
          stakeds.filter((x) => x.nonce === nftNonce).length === 0 && (
            <div className='col'>
              <div>No staked {name} found !</div>
            </div>
          )}
        {stakeds !== undefined &&
          stakeds.filter((x) => x.nonce === nftNonce).length > 0 &&
          stakeds
            .filter((x) => x.nonce === nftNonce)
            .map((bro) => (
              <div
                key={bro.identifier}
                className='col-12 col-sm-12 col-md-12 col-lg-12 mt-3 mx-auto'
              >
                <LazyLoad height={200} offset={100} once>
                  <div className='card text-center nftStakeCard'>
                    <div className='card-header'>{bro.name}</div>
                    <div className='nftStakedDiv'>
                      <img
                        src={bro.url}
                        alt={bro.identifier}
                        className='nftStakedImg card-img-top'
                      />
                    </div>
                    <div className='card-body'>
                      {currentRewards !== undefined && (
                        <div className='card-title'>
                          <div>
                            Claimable rewards:&nbsp;
                            {formatBigNumber(
                              floor(divide(currentRewards, 10 ** 18), 2) as any
                            )}
                            &nbsp;$DEAD
                            <DeadIcon className='mx-1' height={16} width={16} />
                          </div>
                        </div>
                      )}
                      {!hasPendingTransactions &&
                        currentRewards !== undefined &&
                        unstakeTime !== undefined &&
                        rewardsTokenTotalSupply !== undefined && (
                          <div>
                            <div className='w-100'></div>
                            <button
                              className='btn btn-primary ml-1 mt-2'
                              disabled={
                                currentRewards === 0 ||
                                rewardsTokenTotalSupply <= currentRewards
                              }
                              onClick={() => sendClaimTransaction()}
                            >
                              CLAIM{' '}
                              <FontAwesomeIcon
                                icon={faDollarSign}
                                className='text'
                              />
                            </button>
                            <div className='w-100'></div>
                            <button
                              className='btn btn-primary ml-1 mt-2'
                              disabled={moment
                                .unix(unstakeTime)
                                .isAfter(moment())}
                              onClick={() => sendUnstakeTransaction()}
                            >
                              UNSTAKE{' '}
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className='text'
                              />
                            </button>
                          </div>
                        )}
                    </div>
                    {lockTime !== undefined && unstakeTime !== undefined && (
                      <div className='card-footer'>
                        <small className='text-muted'>
                          Lock date:&nbsp;
                          {moment
                            .unix(lockTime)
                            .format('MMMM Do YYYY, h:mm:ss a')}
                        </small>
                        <br />
                        <small className='text-muted'>
                          Unstake date:&nbsp;
                          {moment
                            .unix(unstakeTime)
                            .format('MMMM Do YYYY, h:mm:ss a')}
                        </small>
                      </div>
                    )}
                  </div>
                </LazyLoad>
              </div>
            ))}
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <h4>Unstaked {name}</h4>
        </div>
        {bros === undefined && (
          <div className='col'>
            <div className='spinner-border text-primary mr-2' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {bros !== undefined && bros.length === 0 && (
          <div className='col'>
            <div>No {name} found in your wallet !</div>
          </div>
        )}
        {bros !== undefined &&
          bros.length > 0 &&
          bros.map((bro) => (
            <div
              key={bro.identifier}
              className='col-6 col-sm-6 col-md-4 col-lg-3 mt-3 mx-auto'
            >
              <LazyLoad height={200} offset={100} once>
                <div>
                  <b>{bro.name}</b>
                </div>
                <div className='nft-stake'>
                  <div className='front'>
                    <img
                      src={bro.url}
                      alt={bro.identifier}
                      className='nftStakeImg'
                    />
                  </div>
                </div>
                {stakeds !== undefined &&
                  nftNonce !== undefined &&
                  stakeds.filter((x) => x.nonce === nftNonce).length === 0 &&
                  !hasPendingTransactions && (
                    <div>
                      <div className='w-100'></div>
                      <button
                        className='btn btn-primary ml-1 mt-2'
                        disabled={!stakingStatus}
                        onClick={() => sendStakeTransaction(bro)}
                      >
                        STAKE{' '}
                        <FontAwesomeIcon icon={faArrowUp} className='text' />
                      </button>
                    </div>
                  )}
              </LazyLoad>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NftStaking;
