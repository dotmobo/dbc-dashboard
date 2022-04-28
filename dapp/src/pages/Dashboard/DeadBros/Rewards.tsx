import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { elrondApiUrl, distributionAddress } from 'config';
import axios from 'axios';

import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as MexIcon } from '../../../assets/img/mex.svg';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import { divide, floor } from 'mathjs';
import moment from 'moment';

interface Reward {
  txHash: string;
  action: any;
}

type Rewards = Array<Reward>;

const Rewards = () => {
  const { address, account } = useGetAccountInfo();
  const [rewards, setRewards] = React.useState<Rewards>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (!!elrondApiUrl && !!distributionAddress) {
      axios
        .get<any>(
          `${elrondApiUrl}/accounts/${distributionAddress}/transactions?size=10000&sender=${distributionAddress}&status=success&after=${getLastMonday().unix()}&withLogs=false`
        )
        .then((response) => {
          const rewards = response.data.filter(
            (tx: any) => tx.action?.arguments?.receiver === address
          );
          setRewards(rewards);
        });
    }
  }, []);

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getLastMonday = () => {
    return moment().startOf('isoWeek').startOf('day');
  };

  return (
    <div>
      <h3>
        My weekly rewards &nbsp;
        <FontAwesomeIcon icon={faGift} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {(rewards === undefined || rewards.length === 0) && (
            <div>No weekly rewards found !</div>
          )}
          {rewards !== undefined && rewards.length > 0 && (
            <div>
              <i>Since {getLastMonday().format('YYYY-MM-DD')}:</i>
              {rewards.map((reward: any) => (
                <div key={reward.txHash}>
                  {reward.action?.arguments?.transfers[0]?.name === 'DEAD' && (
                    <DeadIcon className='mx-1' height={16} width={16} />
                  )}
                  {reward.action?.arguments?.transfers[0]?.name ===
                    'LockedMEX' && (
                    <MexIcon className='mx-1' height={16} width={16} />
                  )}
                  <b>{reward.action?.arguments?.transfers[0]?.name}</b>
                  :&nbsp;
                  {formatBigNumber(
                    floor(
                      divide(
                        parseInt(reward.action?.arguments?.transfers[0]?.value),
                        1e18
                      )
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
