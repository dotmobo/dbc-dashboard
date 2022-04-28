import * as React from 'react';
import {
  elrondApiUrl,
  lkFarmName,
  distributionAddress,
  egldMexFarmName
} from 'config';
import axios from 'axios';

import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as MexIcon } from '../../../assets/img/mex.svg';
import { divide, floor } from 'mathjs';

interface LockedLPStaked {
  balance: string;
  decimals: number;
  name: string;
}

const Farms = () => {
  const [lkFarm, setLKMexFarm] = React.useState<LockedLPStaked>();
  const [egldMexFarm, setEgldMexFarm] = React.useState<LockedLPStaked>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (!!elrondApiUrl && !!distributionAddress && !!lkFarmName) {
      axios
        .get<any>(
          `${elrondApiUrl}/accounts/${distributionAddress}/nfts/${lkFarmName}`
        )
        .then((response) => {
          setLKMexFarm(response.data);
        });
    }
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (!!elrondApiUrl && !!distributionAddress && !!egldMexFarmName) {
      axios
        .get<any>(
          `${elrondApiUrl}/accounts/${distributionAddress}/nfts/${egldMexFarmName}`
        )
        .then((response) => {
          setEgldMexFarm(response.data);
        });
    }
  }, []);

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <h3>
        Staking Farms for rewards&nbsp;
        <FontAwesomeIcon icon={faTractor} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {lkFarm === undefined && egldMexFarm === undefined && (
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
          {egldMexFarm !== undefined &&
            egldMexFarm.balance !== undefined &&
            egldMexFarm.name !== undefined && (
              <div>
                <MexIcon className='mx-1' height={16} width={16} />
                <b>MEX-EGLD</b>:&nbsp;
                {formatBigNumber(
                  floor(divide(parseInt(egldMexFarm.balance), 1e18), 2) as any
                )}
                &nbsp;{egldMexFarm.name}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Farms;
