import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import {
  contractAddress,
  deadRareUrl,
  deadTokenId,
  elrondApiUrl,
  lkFarmName,
  nftsCollectionId,
  distributionAddress,
  trustMarketUrl,
  gatewayDeadRareUrl,
  gatewayTrustMarket,
  trustMarketIconUrl,
  deadRareIconUrl
} from 'config';
import axios from 'axios';

import {
  faArrowUp,
  faCheck,
  faGamepad,
  faBolt,
  faShoppingCart,
  faSkull,
  faCoins,
  faDownload,
  faTractor,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { values, min } from 'lodash-es';
import { ReactComponent as MexIcon } from '../../assets/img/mex.svg';
import { ReactComponent as DeadIcon } from '../../assets/img/dead.svg';
import { floor, divide } from 'mathjs';

interface Bro {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
}

export type TBrosList = Bro[];

interface Dead {
  name: string;
  balance: number;
}

interface LockedLPStaked {
  balance: string;
  decimals: number;
  name: string;
}

interface FloorPrice {
  floorPrice: string;
}

const DeadBros = () => {
  const { address, account } = useGetAccountInfo();

  const [bros, setBrosList] = React.useState<TBrosList>();
  const [dead, setDeadToken] = React.useState<Dead>();
  const [lkFarm, setLKMexFarm] = React.useState<LockedLPStaked>();
  const [floorPriceDR, setFloorPriceDR] = React.useState<FloorPrice>();
  const [floorPriceTR, setFloorPriceTR] = React.useState<FloorPrice>();

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

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${elrondApiUrl}/accounts/${address}/tokens/${deadTokenId}`)
      .then((response) => {
        setDeadToken(response.data);
      });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${elrondApiUrl}/accounts/${distributionAddress}/nfts/${lkFarmName}`
      )
      .then((response) => {
        setLKMexFarm(response.data);
      });
  }, []);

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
      .get<any>(
        `${gatewayTrustMarket}/getTokenItemsForSale/${nftsCollectionId}`
      )
      .then((response) => {
        setFloorPriceTR({
          floorPrice: calculateFloorPriceTR(response.data)
        } as FloorPrice);
      });
  }, []);

  const calculateFloorPriceTR = (data: any): string => {
    const getMin = !!data
      ? min(
          values(data)
            .filter((x: any) =>
              x.deadline !== undefined ? parseInt(x.deadline) === 0 : false
            )
            .map((x: any) =>
              x.min_bid !== undefined ? parseInt(x.min_bid) / 1e18 : 0
            )
        )?.toString()
      : 'unknown';
    return !!getMin ? getMin : 'unknown';
  };

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

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className='col mt-4 col-md-12'>
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
      <hr />
      <h3>
        Staking Farms for rewards&nbsp;
        <FontAwesomeIcon icon={faTractor} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {lkFarm === undefined && (
            <div>No LKMEX farms found for rewards !</div>
          )}
          {lkFarm !== undefined &&
            lkFarm.balance !== undefined &&
            lkFarm.name !== undefined && (
              <div>
                <MexIcon className='mx-1' height={16} width={16} />
                <b>LKMEX</b>:&nbsp;
                {formatBigNumber(floor(divide(parseInt(lkFarm.balance), 1e18)))}
                &nbsp;{lkFarm.name}
              </div>
            )}
        </div>
      </div>
      <hr />
      <h3>
        My $DEAD Tokens <FontAwesomeIcon icon={faCoins} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {dead === undefined && (
            <div>No Dead tokens found in your wallet !</div>
          )}
          {dead !== undefined &&
            dead.balance !== undefined &&
            dead.name !== undefined && (
              <div>
                <DeadIcon className='mx-1' height={16} width={16} />
                <b>{dead.name}</b>:&nbsp;
                {formatBigNumber(floor(divide(dead.balance, 1e18)))}
              </div>
            )}
        </div>
      </div>
      <hr />
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
                    <img src={bro.url} alt={bro.identifier} width='222' />
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

export default DeadBros;
