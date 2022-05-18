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
  nftsSerumCollectionId,
  serumMarketAddress,
  serumMarketBuyFn,
  serumOwnerAddress,
  serumWithdrawData
} from 'config';
import axios from 'axios';

import { faShop, faMoneyBillTransfer, faCreditCard, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import { floor, divide } from 'mathjs';
import { orderBy } from 'lodash-es';
import LazyLoad from 'react-lazyload';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';

interface Serum {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
}

const Serum = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  const [serums, setSerumsList] = React.useState<Serum[]>();
  const [price, setPrice] = React.useState<number>();
  const [newPrice, setNewPrice] = React.useState<number>(0);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(serumMarketAddress),
      func: new ContractFunction('getPrice'),
      args: []
    });
    const proxy = new ProxyProvider(network.apiAddress);
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
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${elrondApiUrl}/accounts/${serumMarketAddress}/nfts?size=10000&collections=${nftsSerumCollectionId}`
      )
      .then((response) => {
        setSerumsList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, [hasPendingTransactions]);

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

  function numtoHex(num: number) {
    let result = num.toString(16);
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  const getBuySerumData = (serum: Serum) => {
    return (
      'ESDTTransfer@' +
      strtoHex(deadTokenId) +
      '@' +
      numtoHex(!!price ? price : 0) +
      '@' +
      strtoHex(serumMarketBuyFn) +
      '@' +
      strtoHex(serum.collection) +
      '@' +
      numtoHex(serum.nonce)
    );
  };

  const sendBuySerumTransaction = async (serum: Serum) => {
    const buySerumTransaction = {
      value: '0',
      data: getBuySerumData(serum),
      receiver: serumMarketAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: buySerumTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing buy serum transaction',
        errorMessage: 'An error has occured during buy serum',
        successMessage: 'Buy serum transaction successful'
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
      data: serumWithdrawData,
      receiver: serumMarketAddress,
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
      data: 'change_price@' + numtoHex(!!newPrice ? newPrice * 10 ** 18 : 0),
      receiver: serumMarketAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: changePriceTransaction,
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

  const getAttributes = (serum: Serum): Array<string> => {
    return serum.metadata?.attributes?.map(
      (x: any) => `${x.trait_type} ${x.value}`
    );
  };

  const getAttributesDiv = (serum: Serum) => {
    const attributes = getAttributes(serum);
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

  return (
    <div>
      <h3>
        Buy Serum <FontAwesomeIcon icon={faShop} className='text' />
        &nbsp;
        {serums !== undefined && serums.length > 0 && <span>({serums.length})</span>}
      </h3>
      <div className='row'>
        <div className='col-12'>
          <span className='mr-1'>Market address:</span>
          <span data-testid='serumMarketAddress'>
            <a
              href={elrondExplorerUrl + '/accounts/' + serumMarketAddress}
              target='_blank'
              rel='noopener noreferrer'
            >
              {serumMarketAddress.substring(0, 8) +
                '...' +
                serumMarketAddress.substring(serumMarketAddress.length - 4)}
            </a>
          </span>
        </div>
        {serums === undefined && (
          <div className='col-12'>
            <div className='spinner-border text-primary mr-2' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {serums !== undefined && serums.length === 0 && (
          <div className='col-12'>
            <div>No Serums found in the market !</div>
          </div>
        )}
        {address !== undefined &&
          address === serumOwnerAddress &&
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
                type='number'
                className='mt-2 form-control'
                value={newPrice}
                onChange={handleNewPriceChange}
              />
              <button
                onClick={sendChangePriceTransaction}
                className='btn btn-primary mr-4 mt-2'
              >
                CHANGE PRICE&nbsp;
                <FontAwesomeIcon icon={faBarcode} />
              </button>
            </div>
          )}
        {serums !== undefined &&
          serums.length > 0 &&
          price !== undefined &&
          serums.map((serum) => (
            <div
              key={serum.identifier}
              className='col-12 col-sm-12 col-md-6 col-lg-4 mt-4 mx-auto'
            >
              <LazyLoad height={200} offset={100} once>
                <div>
                  <b>{serum.name}</b>
                </div>
                <div>
                  Rarity&nbsp;
                  {!!serum.metadata?.rarity?.rarityScore
                    ? floor(serum.metadata?.rarity?.rarityScore)
                    : 'unknown'}
                </div>
                <div className='nft serum'>
                  <div className='back'>
                    <h4>Attributes:</h4>
                    {getAttributesDiv(serum)}
                  </div>
                  <div className='front'>
                    <img
                      src={serum.url}
                      alt={serum.identifier}
                      className='nftImg'
                    />
                  </div>
                </div>
                <div>
                  <div className='mt-4'>
                    <b>Price</b>:&nbsp;
                    {formatBigNumber(floor(divide(price, 10 ** 18)))}
                    <DeadIcon className='mx-1' height={16} width={16} />
                  </div>
                  <div className='w-100'></div>
                  <button
                    className='btn btn-primary ml-1 mt-4'
                    onClick={() => sendBuySerumTransaction(serum)}
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

export default Serum;
