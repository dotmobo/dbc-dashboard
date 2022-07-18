import * as React from 'react';
import {
  gatewayDeadRareUrl,
  gatewayTrustMarket,
  trustMarketIconUrl,
  deadRareIconUrl,
  deadRareUrl,
  trustMarketUrl,
  gatewayFrameIt,
  frameItIconUrl,
  frameItUrl,
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

const FloorPrice = ({ collectionId, title, mintUrl }: any) => {
  const [floorPriceDR, setfloorPriceDR] = React.useState<FloorPrice>();
  const [floorPriceDawnTR, setFloorPriceTR] = React.useState<FloorPrice>();
  const [floorPriceDawnFI, setFloorPriceFI] = React.useState<FloorPrice>();

  // DAWN
  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios({
      url: `${gatewayDeadRareUrl}`,
      method: 'post',
      data: {
        query: `{floorPrice(collection: "${collectionId}")}`
      }
    }).then((response) => {
      setfloorPriceDR(response.data.data);
    });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${gatewayTrustMarket}/getFloorPrice/${collectionId}/EGLD`)
      .then((response) => {
        setFloorPriceTR({
          floorPrice: response.data
        } as FloorPrice);
      });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios.get<any>(`${gatewayFrameIt}/${collectionId}`).then((response) => {
      setFloorPriceFI({
        floorPrice: response.data.statistics.floorPrice
      } as FloorPrice);
    });
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <div className='mt-3'>
            <small className='text-muted'>{title}</small>
          </div>
          {floorPriceDR === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {floorPriceDR !== undefined &&
            floorPriceDR.floorPrice !== undefined &&
            floorPriceDR.floorPrice !== null && (
              <div>
                <img src={deadRareIconUrl} alt='deadrare' height={16} />
                <b>DeadRare</b>:&nbsp;
                <span>
                  {divide(number(floorPriceDR?.floorPrice), 10 ** 18)}
                  &nbsp;EGLD
                </span>
                <a
                  className='btn btn-primary ml-3 btn-sm'
                  role='button'
                  aria-pressed='true'
                  href={deadRareUrl + '/collection/' + collectionId}
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
                  href={trustMarketUrl + '/collection/' + collectionId}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  BUY&nbsp;
                  <FontAwesomeIcon icon={faShoppingCart} className='text' />
                </a>
                {!!mintUrl && (
                  <a
                    className='btn btn-primary ml-3 mt-1 btn-sm'
                    role='button'
                    aria-pressed='true'
                    href={mintUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    MINT&nbsp;
                    <FontAwesomeIcon icon={faCandyCane} className='text' />
                  </a>
                )}
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
                  href={frameItUrl + '/marketplace/' + collectionId}
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
