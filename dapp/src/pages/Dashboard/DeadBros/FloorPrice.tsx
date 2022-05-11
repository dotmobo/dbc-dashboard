import * as React from 'react';
import {
  nftsCollectionId,
  gatewayDeadRareUrl,
  gatewayTrustMarket,
  trustMarketIconUrl,
  deadRareIconUrl,
  deadRareUrl,
  trustMarketUrl,
  gatewayFrameIt,
  frameItIconUrl,
  frameItUrl,
  omniscientUrl,
  omniscientIconUrl
} from 'config';
import axios from 'axios';
import {
  faBolt,
  faShoppingCart,
  faCropSimple,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FloorPrice {
  floorPrice: string;
}

const FloorPrice = () => {
  const [floorPriceDR, setFloorPriceDR] = React.useState<FloorPrice>();
  const [floorPriceTR, setFloorPriceTR] = React.useState<FloorPrice>();
  const [floorPriceFI, setFloorPriceFI] = React.useState<FloorPrice>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios({
      url: `${gatewayDeadRareUrl}`,
      method: 'post',
      data: {
        query: `{floorPrice(collection: "${nftsCollectionId}")}`
      }
    }).then((response) => {
      setFloorPriceDR(response.data.data);
    });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${gatewayTrustMarket}/getFloorPrice/${nftsCollectionId}/EGLD`)
      .then((response) => {
        setFloorPriceTR({
          floorPrice: response.data
        } as FloorPrice);
      });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios.get<any>(`${gatewayFrameIt}/${nftsCollectionId}`).then((response) => {
      setFloorPriceFI({
        floorPrice: response.data.statistics.floorPrice
      } as FloorPrice);
    });
  }, []);

  return (
    <div>
      <h3>
        Floor Price&nbsp;
        <FontAwesomeIcon icon={faDollarSign} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {floorPriceDR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceDR !== undefined && floorPriceDR.floorPrice !== undefined && (
            <div>
              <img src={deadRareIconUrl} alt='deadrare' height={16} />
              <b>DeadRare</b>:&nbsp;
              <span>{floorPriceDR?.floorPrice}&nbsp;EGLD</span>
              <a
                className='btn btn-primary ml-3 btn-sm'
                role='button'
                aria-pressed='true'
                href={deadRareUrl + '/collection/' + nftsCollectionId}
                target='_blank'
                rel='noopener noreferrer'
              >
                BUY&nbsp;
                <FontAwesomeIcon icon={faBolt} className='text' />
              </a>
            </div>
          )}
          {floorPriceTR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceTR !== undefined && floorPriceTR.floorPrice !== undefined && (
            <div>
              <img src={trustMarketIconUrl} alt='trustmarket' height={16} />
              <b>TrustMarket</b>:&nbsp;
              <span>{floorPriceTR?.floorPrice}&nbsp;EGLD</span>
              <a
                className='btn btn-primary ml-3 mt-1 btn-sm'
                role='button'
                aria-pressed='true'
                href={trustMarketUrl + '/collection/' + nftsCollectionId}
                target='_blank'
                rel='noopener noreferrer'
              >
                BUY&nbsp;
                <FontAwesomeIcon icon={faShoppingCart} className='text' />
              </a>
            </div>
          )}
          {floorPriceFI === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceFI !== undefined && floorPriceFI.floorPrice !== undefined && (
            <div>
              <img src={frameItIconUrl} alt='frameit' height={16} />
              <b>FrameIt</b>:&nbsp;
              <span>{floorPriceFI?.floorPrice}&nbsp;EGLD</span>
              <a
                className='btn btn-primary ml-3 mt-1 btn-sm'
                role='button'
                aria-pressed='true'
                href={frameItUrl + '/marketplace/' + nftsCollectionId}
                target='_blank'
                rel='noopener noreferrer'
              >
                BUY&nbsp;
                <FontAwesomeIcon icon={faCropSimple} className='text' />
              </a>
            </div>
          )}
          <div>
            <img src={omniscientIconUrl} alt='frameit' height={16} />
            <b>Omnicient</b>:&nbsp;
            <a
              className='btn btn-primary ml-3 mt-1 btn-sm'
              role='button'
              aria-pressed='true'
              href={omniscientUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              STATS&nbsp;
              <FontAwesomeIcon icon={faChartBar} className='text' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPrice;
