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
  faCircle,
  faPersonArrowUpFromLine
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
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import moment from 'moment';
import { Form } from 'react-bootstrap';

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
  currency: string;
  nftStakingAddress: string;
  nftStakingCollection: string;
}

const MultipleNftStaking = ({
  name,
  currency,
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
  const [nbrOfNftStaked, setNbrOfNftStaked] = React.useState<number>();
  const [nbrOfNftStakedByUser, setNbrOfNftStakedByUser] =
    React.useState<number>();
  const [checkedBros, setCheckedBros] = React.useState<Set<number>>(
    new Set<number>()
  );

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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
      func: new ContractFunction('getNbrOfNftStaked'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setNbrOfNftStaked(0);
            break;
          case '':
            setNbrOfNftStaked(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setNbrOfNftStaked(parseInt(decoded, 16));
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
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
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setNbrOfNftStakedByUser(0);
            break;
          case '':
            setNbrOfNftStakedByUser(0);
            break;
          default: {
            const decoded: Uint8Array = Buffer.from(encoded, 'base64');
            const filteredNumbers = Array.from(decoded).filter(
              (x, i) => (i + 1) % 8 === 0
            );
            setNbrOfNftStakedByUser(filteredNumbers.length);
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

  const sendStakeTransaction = async () => {
    // filter checkedBros with bros in wallet
    Array.from(checkedBros).forEach((nonce) => {
      if (!bros?.map((b) => b.nonce).includes(nonce)) {
        checkedBros.delete(nonce);
      }
    });
    if (checkedBros.size === 0) {
      return;
    }

    let data =
      'MultiESDTNFTTransfer@' +
      new Address(nftStakingAddress).hex() +
      '@' +
      numtoHex(checkedBros.size);

    checkedBros.forEach((nonce: number) => {
      data +=
        '@' +
        strtoHex(nftStakingCollection) +
        '@' +
        numtoHex(nonce) +
        '@' +
        numtoHex(1);
    });

    data += '@' + strtoHex('stake');

    const stakeTransaction = {
      value: '0',
      data: data,
      receiver: address,
      gasLimit: 10000000 + (500000 * checkedBros.size)
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
      gasLimit: 20000000
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
    // Clean checked bros when unstaking
    setCheckedBros(new Set());

    const unstakeTransaction = {
      value: '0',
      data: 'unstake',
      receiver: nftStakingAddress,
      gasLimit: 10000000 + (500000 * (!!nbrOfNftStakedByUser ? nbrOfNftStakedByUser : 1))
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

  const handleChooseBro = (event: any, nonce: number) => {
    const res = new Set(checkedBros);
    if (event.target.checked) {
      res.add(nonce);
      setCheckedBros(res);
    } else {
      res.delete(nonce);
      setCheckedBros(res);
    }
  };

  const handleChooseall = (event: any) => {
    if (event.target.checked) {
      const res = new Set(checkedBros);
      bros?.forEach((bro: any) => {
        res.add(bro.nonce);
      });
      setCheckedBros(res);
    } else {
      setCheckedBros(new Set());
    }
  };

  return (
    <div>
      <h3>
        Stake {name} <FontAwesomeIcon icon={faPersonArrowUpFromLine} className='text' />
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
          nbrOfStakers === undefined &&
          nbrOfNftStaked === undefined && (
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
          nbrOfStakers !== undefined &&
          nbrOfNftStaked !== undefined && (
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
                    &nbsp;{currency}
                    {currency === '$DEAD' && (
                      <DeadIcon className='mx-1' height={16} width={16} />
                    )}
                  </div>
                  <div className='card-text'>
                    Rewards per day per NFT:&nbsp;
                    {formatBigNumber(
                      floor(
                        divide(rewardsTokenAmountPerDay, 10 ** 18),
                        2
                      ) as any
                    )}
                    &nbsp;{currency}
                    {currency === '$DEAD' && (
                      <DeadIcon className='mx-1' height={16} width={16} />
                    )}
                  </div>
                  <div className='card-text'>
                    Minimum staking days: {minimumStakingDays}
                  </div>
                </div>
                <div className='card-footer'>
                  <div>
                    <small className='text-muted'>
                      {nbrOfStakers} stakers in the pool
                    </small>
                  </div>
                  <div>
                    <small className='text-muted'>
                      {nbrOfNftStaked} NFTs staked in the pool
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <h4>Staked {name}</h4>
        </div>
        {nbrOfNftStakedByUser === undefined && (
          <div className='col'>
            <div className='spinner-border text-primary mr-2' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {nbrOfNftStakedByUser !== undefined && nbrOfNftStakedByUser === 0 && (
          <div className='col'>
            <div>No staked {name} found !</div>
          </div>
        )}
        {nbrOfNftStakedByUser !== undefined && nbrOfNftStakedByUser > 0 && (
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mt-3 mx-auto'>
            <div className='card text-center nftStakeCard'>
              <div className='card-header'>
                {nbrOfNftStakedByUser} NFTs staked
              </div>
              <div className='nftStakedDiv'>
                <span className='badge badge-pill badge-primary mt-2 mb-2'>
                  {nbrOfNftStakedByUser}
                </span>
              </div>
              <div className='card-body'>
                {currentRewards !== undefined && (
                  <div className='card-title'>
                    <div>
                      Claimable rewards:&nbsp;
                      {formatBigNumber(
                        floor(divide(currentRewards, 10 ** 18), 2) as any
                      )}
                      &nbsp;{currency}
                      {currency === '$DEAD' && (
                        <DeadIcon className='mx-1' height={16} width={16} />
                      )}
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
                        <FontAwesomeIcon icon={faDollarSign} className='text' />
                      </button>
                      <div className='w-100'></div>
                      <button
                        className='btn btn-primary ml-1 mt-2'
                        disabled={moment.unix(unstakeTime).isAfter(moment())}
                        onClick={() => sendUnstakeTransaction()}
                      >
                        UNSTAKE{' '}
                        <FontAwesomeIcon icon={faArrowDown} className='text' />
                      </button>
                    </div>
                  )}
              </div>
              {lockTime !== undefined && unstakeTime !== undefined && (
                <div className='card-footer'>
                  <small className='text-muted'>
                    Lock date:&nbsp;
                    {moment.unix(lockTime).format('MMMM Do YYYY, h:mm:ss a')}
                  </small>
                  <br />
                  <small className='text-muted'>
                    Unstake date:&nbsp;
                    {moment.unix(unstakeTime).format('MMMM Do YYYY, h:mm:ss a')}
                  </small>
                </div>
              )}
            </div>
          </div>
        )}
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
          checkedBros !== undefined &&
          checkedBros.size > 0 &&
          nbrOfNftStakedByUser !== undefined &&
          !hasPendingTransactions && (
            <div className='col-12'>
              <div className='alert alert-warning' role='alert'>
                Don&apos;t forget to withdraw your rewards before staking more NFTs, because that process reset your rewards.
              </div>
              <div className='w-100'></div>
              <button
                className='btn btn-primary ml-1 mt-2'
                onClick={() => sendStakeTransaction()}
              >
                STAKE <FontAwesomeIcon icon={faArrowUp} className='text' />
              </button>
            </div>
          )}
        {bros !== undefined &&
          bros.length > 0 &&
          nbrOfNftStakedByUser !== undefined && (
            <div className='col-12 mt-3'>
              <Form.Check
                label='Select all'
                onChange={(e) => handleChooseall(e)}
              />
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
                  {nbrOfNftStakedByUser !== undefined && (
                    <Form.Check
                      checked={checkedBros.has(bro.nonce)}
                      label={'Select n°' + bro.nonce}
                      onChange={(e) => handleChooseBro(e, bro.nonce)}
                    />
                  )}
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
              </LazyLoad>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MultipleNftStaking;
