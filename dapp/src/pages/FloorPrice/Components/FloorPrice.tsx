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
  nftsLegendaryCollectionId,
  nftsDawnCollectionId
} from 'config';
import axios from 'axios';
import {
  faBolt,
  faShoppingCart,
  faCropSimple,
  faCandyCane
} from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { divide, number } from 'mathjs';

interface FloorPrice {
  floorPrice: string;
}

const FloorPrice = () => {
  const [floorPriceDR, setFloorPriceDR] = React.useState<FloorPrice>();
  const [floorPriceTR, setFloorPriceTR] = React.useState<FloorPrice>();
  const [floorPriceFI, setFloorPriceFI] = React.useState<FloorPrice>();

  const [floorPriceLegendaryDR, setFloorPriceLegendaryDR] =
    React.useState<FloorPrice>();
  const [floorPriceLegendaryTR, setFloorPriceLegendaryTR] =
    React.useState<FloorPrice>();
  const [floorPriceLegendaryFI, setFloorPriceLegendaryFI] =
    React.useState<FloorPrice>();

  const [floorPriceDawnDR, setFloorPriceDawnDR] = React.useState<FloorPrice>();
  const [floorPriceDawnTR, setFloorPriceDawnTR] = React.useState<FloorPrice>();
  const [floorPriceDawnFI, setFloorPriceDawnFI] = React.useState<FloorPrice>();

  // GENESIS
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

  // LEGENDARY
  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios({
      url: `${gatewayDeadRareUrl}`,
      method: 'post',
      data: {
        query: `{floorPrice(collection: "${nftsLegendaryCollectionId}")}`
      }
    }).then((response) => {
      setFloorPriceLegendaryDR(response.data.data);
    });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${gatewayTrustMarket}/getFloorPrice/${nftsLegendaryCollectionId}/EGLD`
      )
      .then((response) => {
        setFloorPriceLegendaryTR({
          floorPrice: response.data
        } as FloorPrice);
      });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${gatewayFrameIt}/${nftsLegendaryCollectionId}`)
      .then((response) => {
        setFloorPriceLegendaryFI({
          floorPrice: response.data.statistics.floorPrice
        } as FloorPrice);
      });
  }, []);

  // DAWN
  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios({
      url: `${gatewayDeadRareUrl}`,
      method: 'post',
      data: {
        query: `{floorPrice(collection: "${nftsDawnCollectionId}")}`
      }
    }).then((response) => {
      setFloorPriceDawnDR(response.data.data);
    });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${gatewayTrustMarket}/getFloorPrice/${nftsDawnCollectionId}/EGLD`
      )
      .then((response) => {
        setFloorPriceDawnTR({
          floorPrice: response.data
        } as FloorPrice);
      });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${gatewayFrameIt}/${nftsDawnCollectionId}`)
      .then((response) => {
        setFloorPriceDawnFI({
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
          <div>
            <small className='text-muted'>GENESIS</small>
          </div>
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
              <span>
                {divide(number(floorPriceDR?.floorPrice), 10 ** 18)}&nbsp;EGLD
              </span>
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
              <b>Xoxno</b>:&nbsp;
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
          <div className='mt-3'>
            <small className='text-muted'>LEGENDARY</small>
          </div>
          {floorPriceLegendaryDR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceLegendaryDR !== undefined &&
            floorPriceLegendaryDR.floorPrice !== undefined &&
            floorPriceLegendaryDR.floorPrice !== null && (
              <div>
                <img src={deadRareIconUrl} alt='deadrare' height={16} />
                <b>DeadRare</b>:&nbsp;
                <span>
                  {divide(number(floorPriceLegendaryDR?.floorPrice), 10 ** 18)}
                  &nbsp;EGLD
                </span>
                <a
                  className='btn btn-primary ml-3 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={
                    deadRareUrl + '/collection/' + nftsLegendaryCollectionId
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faBolt} className='text' />
                </a>
              </div>
            )}
          {floorPriceLegendaryTR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceLegendaryTR !== undefined &&
            floorPriceLegendaryTR.floorPrice !== undefined && (
              <div>
                <img src={trustMarketIconUrl} alt='trustmarket' height={16} />
                <b>Xoxno</b>:&nbsp;
                <span>{floorPriceLegendaryTR?.floorPrice}&nbsp;EGLD</span>
                <a
                  className='btn btn-primary ml-3 mt-1 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={
                    trustMarketUrl + '/collection/' + nftsLegendaryCollectionId
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faShoppingCart} className='text' />
                </a>
              </div>
            )}
          {floorPriceLegendaryFI === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceLegendaryFI !== undefined &&
            floorPriceLegendaryFI.floorPrice !== undefined && (
              <div>
                <img src={frameItIconUrl} alt='frameit' height={16} />
                <b>FrameIt</b>:&nbsp;
                <span>{floorPriceLegendaryFI?.floorPrice}&nbsp;EGLD</span>
                <a
                  className='btn btn-primary ml-3 mt-1 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={
                    frameItUrl + '/marketplace/' + nftsLegendaryCollectionId
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faCropSimple} className='text' />
                </a>
              </div>
            )}
          <div className='mt-3'>
            <small className='text-muted'>DAWN</small>
          </div>
          {floorPriceDawnDR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceDawnDR !== undefined &&
            floorPriceDawnDR.floorPrice !== undefined &&
            floorPriceDawnDR.floorPrice !== null && (
              <div>
                <img src={deadRareIconUrl} alt='deadrare' height={16} />
                <b>DeadRare</b>:&nbsp;
                <span>
                  {divide(number(floorPriceDawnDR?.floorPrice), 10 ** 18)}
                  &nbsp;EGLD
                </span>
                <a
                  className='btn btn-primary ml-3 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={deadRareUrl + '/collection/' + nftsDawnCollectionId}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faBolt} className='text' />
                </a>
              </div>
            )}
          {floorPriceDawnTR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceDawnTR !== undefined &&
            floorPriceDawnTR.floorPrice !== undefined && (
              <div>
                <img src={trustMarketIconUrl} alt='trustmarket' height={16} />
                <b>Xoxno</b>:&nbsp;
                <span>{floorPriceDawnTR?.floorPrice}&nbsp;EGLD</span>
                <a
                  className='btn btn-primary ml-3 mt-1 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={trustMarketUrl + '/collection/' + nftsDawnCollectionId}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faShoppingCart} className='text' />
                </a>
                <a
                  className='btn btn-primary ml-3 mt-1 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={trustMarketUrl + '/collection/DAWNBROS-09395f?filters=%7B"name"%3A""%2C"order"%3A"Price%3A+Low+to+High"%2C"orderValue"%3A"saleInfoNft%2Fmin_bid_short+asc"%2C"tokens"%3A%5B%5D%2C"attributes"%3A%5B%5D%2C"saleType"%3A"Nft"%2C"tab"%3A"mint"%7D'}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  MINT&nbsp;
                  <FontAwesomeIcon icon={faCandyCane} className='text' />
                </a>
              </div>
            )}
          {floorPriceDawnFI === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceDawnFI !== undefined &&
            floorPriceDawnFI.floorPrice !== undefined && (
              <div>
                <img src={frameItIconUrl} alt='frameit' height={16} />
                <b>FrameIt</b>:&nbsp;
                <span>{floorPriceDawnFI?.floorPrice}&nbsp;EGLD</span>
                <a
                  className='btn btn-primary ml-3 mt-1 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={frameItUrl + '/marketplace/' + nftsDawnCollectionId}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faCropSimple} className='text' />
                </a>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FloorPrice;
