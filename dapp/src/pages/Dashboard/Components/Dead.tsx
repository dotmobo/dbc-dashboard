import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { deadTokenId, elrondApiUrl } from 'config';
import axios from 'axios';

import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import { divide, floor } from 'mathjs';

interface Dead {
  name: string;
  balance: number;
  decimals: number;
}

const Dead = () => {
  const { address, account } = useGetAccountInfo();

  const [dead, setDeadToken] = React.useState<Dead>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${elrondApiUrl}/accounts/${address}/tokens/${deadTokenId}`)
      .then((response) => {
        setDeadToken(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setDeadToken({
            name: 'DEAD',
            balance: 0,
            decimals: 18
          });
        }
      });
  }, []);

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <h3>
        My $DEAD Tokens <FontAwesomeIcon icon={faCoins} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {dead === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {dead !== undefined &&
            dead.balance !== undefined &&
            dead.name !== undefined && (
              <div>
                <DeadIcon className='mx-1' height={16} width={16} />
                <b>{dead.name}</b>:&nbsp;
                {formatBigNumber(
                  floor(divide(dead.balance, 10 ** dead.decimals))
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dead;
