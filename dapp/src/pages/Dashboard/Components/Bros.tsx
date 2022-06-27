import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import {
  contractAddress,
  deadRareUrl,
  elrondApiUrl,
  elrondExplorerUrl,
  frameItUrl,
  nftsCollectionId,
  nftsSerumCollectionId,
  nftsLegendaryCollectionId,
  nftsDawnCollectionId,
  trustMarketUrl
} from 'config';
import axios from 'axios';

import {
  faBolt,
  faShoppingCart,
  faSkull,
  faDownload,
  faCropSimple
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { floor } from 'mathjs';
import LazyLoad from 'react-lazyload';
import { orderBy } from 'lodash-es';

interface Bro {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
}

export type TBrosList = Bro[];

const Bros = () => {
  const { address } = useGetAccountInfo();

  const [bros, setBrosList] = React.useState<TBrosList>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${elrondApiUrl}/accounts/${address}/nfts?size=10000&collections=${nftsDawnCollectionId},${nftsLegendaryCollectionId},${nftsSerumCollectionId},${nftsCollectionId}`
      )
      .then((response) => {
        setBrosList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, []);

  const getAttributes = (bro: Bro): Array<string> => {
    return bro.metadata?.attributes?.map(
      (x: any) => `${x.trait_type} ${x.value}`
    );
  };

  const getAttributesDiv = (bro: Bro) => {
    const attributes = getAttributes(bro);
    return !!attributes ? (
      attributes?.map((attribute) => <span key={attribute}>{attribute}</span>)
    ) : (
      <span>Attributes not found</span>
    );
  };

  const downloadImg = (bro: Bro) => {
    axios.get<any>(bro.url, { responseType: 'blob' }).then((response) => {
      const blob = new Blob([response.data], { type: 'image/png' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${bro.name}.png`;
      link.click();
    });
  };

  return (
    <div>
      <h3>
        My #DeadBrothers <FontAwesomeIcon icon={faSkull} className='text' />
        &nbsp;
        {bros !== undefined && bros.length > 0 && <span>({bros.length})</span>}
      </h3>
      <div className='row'>
        <div className='col-12'>
          <span className='mr-1'>Mint address:</span>
          <span data-testid='mintAddress'>
            <a
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
        {bros === undefined && (
          <div className='col'>
            <div className='spinner-border text-primary mr-2' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {bros !== undefined && bros.length === 0 && (
          <div className='col'>
            <div>No DeadBrothers found in your wallet !</div>
          </div>
        )}
        {bros !== undefined &&
          bros.length > 0 &&
          bros.map((bro) => (
            <div
              key={bro.identifier}
              className='col-12 col-sm-12 col-md-6 col-lg-4 mt-4 mx-auto'
            >
              <LazyLoad height={200} offset={100} once>
                <div>
                  <b>{bro.name}</b>
                </div>
                <div>
                  Rarity&nbsp;
                  {!!bro.metadata?.rarity?.rarityScore
                    ? floor(bro.metadata?.rarity?.rarityScore)
                    : 'unknown'}
                </div>
                <div
                  className={
                    bro.collection === nftsSerumCollectionId
                      ? 'nft serum'
                      : bro.collection === nftsLegendaryCollectionId
                      ? 'nft legendary'
                      : bro.collection === nftsDawnCollectionId
                      ? 'nft dawn'
                      : 'nft deadbrother'
                  }
                >
                  <div className='back'>
                    <h4>Attributes:</h4>
                    {getAttributesDiv(bro)}
                  </div>
                  <div className='front'>
                    <img
                      src={bro.url}
                      alt={bro.identifier}
                      className='nftImg'
                    />
                  </div>
                </div>
                <div>
                  <div className='w-100'></div>
                  <button
                    className='btn btn-primary ml-1 mt-2'
                    onClick={() => downloadImg(bro)}
                  >
                    DOWNLOAD&nbsp;
                    <FontAwesomeIcon icon={faDownload} className='text' />
                  </button>
                  <div className='w-100'></div>
                  <a
                    className='btn btn-primary ml-1 mt-2'
                    role='button'
                    aria-pressed='true'
                    href={deadRareUrl + '/nft/' + bro.identifier}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    DEADRARE&nbsp;
                    <FontAwesomeIcon icon={faBolt} className='text' />
                  </a>
                  <div className='w-100'></div>
                  <a
                    className='btn btn-primary ml-1 mt-2'
                    role='button'
                    aria-pressed='true'
                    href={trustMarketUrl + '/nft/' + bro.identifier}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    XOXNO&nbsp;
                    <FontAwesomeIcon icon={faShoppingCart} className='text' />
                  </a>
                  <div className='w-100'></div>
                  <a
                    className='btn btn-primary ml-1 mt-2'
                    role='button'
                    aria-pressed='true'
                    href={frameItUrl + '/marketplace/nft/' + bro.identifier}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    FRAMEIT&nbsp;
                    <FontAwesomeIcon icon={faCropSimple} className='text' />
                  </a>
                </div>
              </LazyLoad>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bros;
