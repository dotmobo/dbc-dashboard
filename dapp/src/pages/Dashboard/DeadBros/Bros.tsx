import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import {
  deadRareUrl,
  elrondApiUrl,
  nftsCollectionId,
  trustMarketUrl
} from 'config';
import axios from 'axios';

import {
  faBolt,
  faShoppingCart,
  faSkull,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { floor } from 'mathjs';

interface Bro {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
}

export type TBrosList = Bro[];

const Bros = () => {
  const { address, account } = useGetAccountInfo();

  const [bros, setBrosList] = React.useState<TBrosList>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${elrondApiUrl}/accounts/${address}/nfts?size=10000&collections=${nftsCollectionId}`
      )
      .then((response) => {
        setBrosList(response.data);
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
      attributes?.map((attribute) => <div key={attribute}>{attribute}</div>)
    ) : (
      <div>Attributes not found</div>
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
              <div>
                <b>{bro.name}</b>
              </div>
              <div>
                Rarity&nbsp;
                {!!bro.metadata?.rarity?.rarityScore
                  ? floor(bro.metadata?.rarity?.rarityScore)
                  : 'unknown'}
              </div>
              <div>
                <div>
                  <OverlayTrigger
                    key='attributes'
                    placement='bottom'
                    overlay={
                      <Tooltip id='tooltip-attributes'>
                        {getAttributesDiv(bro)}
                      </Tooltip>
                    }
                  >
                    <img
                      src={bro.url}
                      alt={bro.identifier}
                      width='222'
                      className='imgBorder'
                    />
                  </OverlayTrigger>
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
                  TRUSTMARKET&nbsp;
                  <FontAwesomeIcon icon={faShoppingCart} className='text' />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bros;
