import * as React from 'react';
import {
  elrondApiUrl,
  lkFarmsNames,
  distributionAddress,
  elrondExplorerUrl
} from 'config';
import axios from 'axios';

import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as MexIcon } from '../../../assets/img/mex.svg';
import { ReactComponent as ZPayIcon } from '../../../assets/img/zpay.svg';
import { divide, floor } from 'mathjs';

interface LockedLPStaked {
  identifier: string;
  balance: string;
  decimals: number;
  name: string;
}

type LKFarmsList = Array<LockedLPStaked>;

const Farms = () => {
  const [lkFarms, setLKMexFarms] = React.useState<LKFarmsList>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (!!elrondApiUrl && !!distributionAddress && !!lkFarmsNames) {
      axios
        .get<any>(
          `${elrondApiUrl}/accounts/${distributionAddress}/nfts?collections=${lkFarmsNames}`
        )
        .then((response) => {
          setLKMexFarms(response.data);
        });
    }
  }, []);

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getFarmName = (lkFarm: LockedLPStaked) => {
    let name = 'UNKNOWN FARM';
    if (lkFarm.name === 'ITHWEGLDLPStakedLK') {
      name = 'ITHEUM-EGLD';
    } else if (lkFarm.name === 'UTKWEGLDLPStakedLK') {
      name = 'UTK-EGLD';
    } else if (lkFarm.name === 'EGLDMEXLPStakedLK') {
      name = 'MEX-EGLD';
    } else if (lkFarm.name === 'LockedLPStaked') {
      if (parseInt(lkFarm.balance) > 10000 * 10 ** lkFarm.decimals) {
        name = 'LKMEX';
      } else {
        name = 'MEX-EGLD';
      }
    } else if (lkFarm.name === 'StakedZPAY') {
      name = 'ZPAY';
    } else if (lkFarm.name === 'StakedRIDE') {
      name = 'RIDE';
    } else if (lkFarm.name === 'StakedITHEUM') {
      name = 'ITHEUM';
    }
    return name;
  };

  const isMexIcon = (lkFarm: LockedLPStaked) => {
    let isMex = false;
    if (lkFarm.name === 'ITHWEGLDLPStakedLK') {
      isMex = true;
    } else if (lkFarm.name === 'EGLDMEXLPStakedLK') {
      isMex = true;
    } else if (lkFarm.name === 'UTKWEGLDLPStakedLK') {
      isMex = true;
    } else if (lkFarm.name === 'LockedLPStaked') {
      isMex = true;
    }
    return isMex;
  };

  const isZPayIcon = (lkFarm: LockedLPStaked) => {
    let isZPay = false;
    if (lkFarm.name === 'StakedZPAY') {
      isZPay = true;
    }
    return isZPay;
  };

  // use the balance to show lkmex or mex-egld label, because lkfarm token can be on mex-egld farm too ...
  return (
    <div>
      <h3>
        Staking Farms for rewards&nbsp;
        <FontAwesomeIcon icon={faTractor} className='text' />
      </h3>
      <div className='row'>
        <div className='col-12 mb-2'>
          <span className='mr-1'>Farms address:</span>
          <span data-testid='distributionAddress'>
            <a
              href={elrondExplorerUrl + '/accounts/' + distributionAddress}
              target='_blank'
              rel='noopener noreferrer'
            >
              {distributionAddress.substring(0, 8) +
                '...' +
                distributionAddress.substring(distributionAddress.length - 4)}
            </a>
          </span>
        </div>
        <div className='col'>
          {lkFarms === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {lkFarms !== undefined && lkFarms.length === 0 && (
            <div>No LKMEX farms found for rewards !</div>
          )}
          {lkFarms !== undefined &&
            lkFarms.length > 0 &&
            lkFarms.map((lkFarm: any) => (
              <div key={lkFarm.identifier}>
                {lkFarm.balance !== undefined && lkFarm.name !== undefined && (
                  <div>
                    {isMexIcon(lkFarm) && (
                      <MexIcon className='mx-1' height={16} width={16} />
                    )}
                    {isZPayIcon(lkFarm) && (
                      <ZPayIcon className='mx-1' height={16} width={16} />
                    )}
                    <b>{getFarmName(lkFarm)}</b>
                    :&nbsp;
                    {formatBigNumber(
                      floor(
                        divide(parseInt(lkFarm.balance), 10 ** lkFarm.decimals),
                        2
                      ) as any
                    )}
                    &nbsp;{lkFarm.name}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Farms;
