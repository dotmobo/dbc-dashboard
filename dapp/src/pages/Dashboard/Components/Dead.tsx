import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { deadTokenId, elrondApiUrl, esdtMarketUrl } from 'config';
import axios from 'axios';

import {
  faCoins,
  faArrowRightArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import { divide, floor } from 'mathjs';

interface Dead {
  name: string;
  balance: number;
  decimals: number;
}

const Dead = ({ title }: any) => {
  const { address, account } = useGetAccountInfo();

  const [dead, setDeadToken] = React.useState<Dead | null>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${elrondApiUrl}/accounts/${address}/tokens/${deadTokenId}`)
      .then((response) => {
        setDeadToken(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setDeadToken(null);
        }
      });
  }, []);

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <h3>
        My {title} Tokens <FontAwesomeIcon icon={faCoins} className='text' />
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
          {dead === null && <div>Empty wallet</div>}
          {dead !== undefined &&
            dead !== null &&
            dead.balance !== undefined &&
            dead.name !== undefined && (
              <div>
                {dead.name.includes('DEAD') && (
                  <DeadIcon className='mx-1' height={16} width={16} />
                )}
                <b>{dead.name}</b>:&nbsp;
                {formatBigNumber(
                  floor(divide(dead.balance, 10 ** dead.decimals))
                )}
                <div>
                  <small className='text-muted'>{deadTokenId}</small>
                </div>
              </div>
            )}
          <a
            className='btn btn-primary mt-3 btn-sm'
            role='button'
            aria-pressed='true'
            href={esdtMarketUrl + '?swapToken=' + deadTokenId}
            target='_blank'
            rel='noopener noreferrer'
          >
            EXCHANGE&nbsp;
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dead;
