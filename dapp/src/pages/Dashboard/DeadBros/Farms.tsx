import * as React from 'react';
import { elrondApiUrl, lkFarmsNames, distributionAddress } from 'config';
import axios from 'axios';

import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as MexIcon } from '../../../assets/img/mex.svg';
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

  // use the balance to show lkmex or mex-egld label, because lkfarm token can be on mex-egld farm too ...
  return (
    <div>
      <h3>
        Staking Farms for rewards&nbsp;
        <FontAwesomeIcon icon={faTractor} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {lkFarms === undefined ||
            (lkFarms.length === 0 && (
              <div>No LKMEX farms found for rewards !</div>
            ))}
          {lkFarms !== undefined &&
            lkFarms.length > 0 &&
            lkFarms.map((lkFarm: any) => (
              <div key={lkFarm.identifier}>
                {lkFarm.balance !== undefined && lkFarm.name !== undefined && (
                  <div>
                    <MexIcon className='mx-1' height={16} width={16} />
                    <b>
                      {lkFarm.balance > 10000 * 10 ** lkFarm.decimals
                        ? 'LKMEX'
                        : 'MEX-EGLD'}
                    </b>
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
