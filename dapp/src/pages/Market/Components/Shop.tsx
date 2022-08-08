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
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import {
  faShop,
  faMoneyBillTransfer,
  faCreditCard,
  faBarcode,
  faIdBadge
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { shuffle } from 'lodash-es';
import { floor, divide } from 'mathjs';
import LazyLoad from 'react-lazyload';
import { elrondApiUrl, elrondExplorerUrl } from 'config';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import converter from 'hex2dec';

interface Shop {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
}

interface ShopType {
  title: string;
  currency: string;
  shopMarketAddress: string;
  shopOwnerAddress: string;
  shopMarketBuyFn: string;
  shopWithdrawData: string;
  shopMarketTokenId: string;
}

const Shop = ({
  title,
  currency,
  shopMarketAddress,
  shopOwnerAddress,
  shopMarketBuyFn,
  shopWithdrawData,
  shopMarketTokenId
}: ShopType) => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  const [items, setItemsList] = React.useState<Shop[]>();
  const [price, setPrice] = React.useState<number>();
  const [nftId, setNftId] = React.useState<string>('');
  const [newPrice, setNewPrice] = React.useState<string>('');
  const [newNftId, setNewNftId] = React.useState<string>('');

  React.useEffect(() => {
    const query = new Query({
      address: new Address(shopMarketAddress),
      func: new ContractFunction('getPrice'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setPrice(0);
            break;
          case '':
            setPrice(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setPrice(parseInt(decoded, 16));
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
      address: new Address(shopMarketAddress),
      func: new ContractFunction('getNftIdentifier'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress, { timeout: 3000 });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setNftId('');
            break;
          case '':
            setNftId('');
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString();
            setNftId(decoded);
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
    // Use [] as second argument in useEffect for not rendering each time
    if (!!nftId) {
      axios
        .get<any>(
          `${elrondApiUrl}/accounts/${shopMarketAddress}/nfts?size=10000&collections=${nftId}`
        )
        .then((response) => {
          setItemsList(shuffle(response.data));
        });
    }
  }, [hasPendingTransactions, nftId]);

  const { sendTransactions } = transactionServices;

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

  function numtoHex(num: number) {
    let result = num.toString(16);
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  const getBuyItemData = (item: Shop) => {
    return (
      'ESDTTransfer@' +
      strtoHex(shopMarketTokenId) +
      '@' +
      largeNumberToHex(
        !!price ? price.toLocaleString('fullwide', { useGrouping: false }) : '0'
      ) +
      '@' +
      strtoHex(shopMarketBuyFn) +
      '@' +
      strtoHex(item.collection) +
      '@' +
      numtoHex(item.nonce)
    );
  };

  const sendBuyItemTransaction = async (item: Shop) => {
    const buyItemTransaction = {
      value: '0',
      data: getBuyItemData(item),
      receiver: shopMarketAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: buyItemTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing buy item transaction',
        errorMessage: 'An error has occured during buy item',
        successMessage: 'Buy item transaction successful'
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
      data: shopWithdrawData,
      receiver: shopMarketAddress,
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

  const sendChangePriceTransaction = async () => {
    const changePriceTransaction = {
      value: '0',
      data:
        'change_price@' +
        largeNumberToHex(!!newPrice ? newPrice + '0'.repeat(18) : '0'),
      receiver: shopMarketAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: changePriceTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing change price transaction',
        errorMessage: 'An error has occured during change price',
        successMessage: 'Change price transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendChangeNftIdTransaction = async () => {
    const changeNftIdTransaction = {
      value: '0',
      data: 'change_nft_identifier@' + strtoHex(newNftId),
      receiver: shopMarketAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: changeNftIdTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing change nft transaction',
        errorMessage: 'An error has occured during change nft',
        successMessage: 'Change nft transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const getAttributes = (item: Shop): Array<string> => {
    return item.metadata?.attributes?.map(
      (x: any) => `${x.trait_type} ${x.value}`
    );
  };

  const getAttributesDiv = (item: Shop) => {
    const attributes = getAttributes(item);
    return !!attributes ? (
      attributes?.map((attribute) => <span key={attribute}>{attribute}</span>)
    ) : (
      <span>Attributes not found</span>
    );
  };

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNewPriceChange = (event: any) => {
    setNewPrice(event.target.value);
  };

  const handleNewNftIdChange = (event: any) => {
    setNewNftId(event.target.value);
  };

  return (
    <div>
      <h3>
        {title} <FontAwesomeIcon icon={faShop} className='text' />
        &nbsp;
        {items !== undefined && items.length > 0 && (
          <span>({items.length})</span>
        )}
      </h3>
      <div className='row'>
        <div className='col-12'>
          <span className='mr-1 mb-2'>Market address:</span>
          <span data-testid='shopMarketAddress'>
            <a
              href={elrondExplorerUrl + '/accounts/' + shopMarketAddress}
              target='_blank'
              rel='noopener noreferrer'
            >
              {shopMarketAddress.substring(0, 8) +
                '...' +
                shopMarketAddress.substring(shopMarketAddress.length - 4)}
            </a>
          </span>
        </div>
        {items === undefined && (
          <div className='col-12'>
            <div className='spinner-border text-primary mr-2' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {items !== undefined && items.length === 0 && (
          <div className='col-12'>
            <div>No Items found in the market !</div>
          </div>
        )}
        {address !== undefined &&
          address === shopOwnerAddress &&
          !hasPendingTransactions && (
            <div className='mt-2 col-12'>
              <button
                onClick={sendWithdrawTransaction}
                className='btn btn-primary mr-4'
              >
                WITHDRAW&nbsp;
                <FontAwesomeIcon icon={faMoneyBillTransfer} />
              </button>
              <input
                type='text'
                className='mt-2 form-control'
                value={newPrice}
                onChange={handleNewPriceChange}
                onKeyPress={(event) => {
                  if (!/\d/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <button
                onClick={sendChangePriceTransaction}
                className='btn btn-primary mr-4 mt-2'
                disabled={newPrice === ''}
              >
                CHANGE PRICE&nbsp;
                <FontAwesomeIcon icon={faBarcode} />
              </button>
              <input
                type='text'
                className='mt-2 form-control'
                value={newNftId}
                onChange={handleNewNftIdChange}
              />
              <button
                onClick={sendChangeNftIdTransaction}
                disabled={newNftId === ''}
                className='btn btn-primary mr-4 mt-2'
              >
                CHANGE NFT ID&nbsp;
                <FontAwesomeIcon icon={faIdBadge} />
              </button>
            </div>
          )}
        {items !== undefined &&
          items.length > 0 &&
          price !== undefined &&
          nftId !== undefined &&
          items.slice(0, 1).map((item) => (
            <div
              key={item.identifier}
              className='col-12 col-sm-12 col-md-6 col-lg-4 mt-4 mx-auto'
            >
              <LazyLoad height={200} offset={100} once>
                <div>
                  <b>{item.name}</b>
                </div>
                <div>
                  Rarity&nbsp;
                  {!!item.metadata?.rarity?.rarityScore
                    ? floor(item.metadata?.rarity?.rarityScore)
                    : 'unknown'}
                </div>
                <div className='nft'>
                  <div className='back'>
                    <h4>Attributes:</h4>
                    {getAttributesDiv(item)}
                  </div>
                  <div className='front'>
                    <img
                      src={item.url}
                      alt={item.identifier}
                      className='nftImg'
                    />
                  </div>
                </div>
                <div>
                  <div className='mt-4'>
                    <b>Price</b>:&nbsp;
                    {formatBigNumber(floor(divide(price, 10 ** 18)))} {currency}
                    {currency === '$DEAD' && (
                      <DeadIcon className='mx-1' height={16} width={16} />
                    )}
                  </div>
                  <div>
                    <b>Collection</b>:&nbsp;
                    {nftId}
                  </div>
                  <div className='w-100'></div>
                  <button
                    className='btn btn-primary ml-1 mt-4'
                    onClick={() => sendBuyItemTransaction(item)}
                  >
                    BUY&nbsp;
                    <FontAwesomeIcon icon={faCreditCard} className='text' />
                  </button>
                </div>
              </LazyLoad>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
