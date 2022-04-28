import * as React from 'react';
import {
  nftsCollectionId,
  gatewayDeadRareUrl,
  gatewayTrustMarket,
  trustMarketIconUrl,
  deadRareIconUrl
} from 'config';
import axios from 'axios';

import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FloorPrice {
  floorPrice: string;
}

const FloorPrice = () => {
  const [floorPriceDR, setFloorPriceDR] = React.useState<FloorPrice>();
  const [floorPriceTR, setFloorPriceTR] = React.useState<FloorPrice>();

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

  return (
    <div>
      <h3>
        Floor Price&nbsp;
        <FontAwesomeIcon icon={faDollarSign} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {floorPriceDR === undefined && <div>No DR floor price found !</div>}
          {floorPriceDR !== undefined && floorPriceDR.floorPrice !== undefined && (
            <div>
              <img src={deadRareIconUrl} alt='deadrare' height={16} />
              <b>DeadRare</b>:&nbsp;
              {floorPriceDR?.floorPrice}&nbsp;EGLD
            </div>
          )}
          {floorPriceTR === undefined && <div>No TR floor price found !</div>}
          {floorPriceTR !== undefined && floorPriceTR.floorPrice !== undefined && (
            <div>
              <img src={trustMarketIconUrl} alt='trustmarket' height={16} />
              <b>TrustMarket</b>:&nbsp;
              {floorPriceTR?.floorPrice}&nbsp;EGLD
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloorPrice;
