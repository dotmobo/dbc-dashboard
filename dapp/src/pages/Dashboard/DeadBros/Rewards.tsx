import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { elrondApiUrl, distributionAddress } from 'config';
import axios from 'axios';

import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as MexIcon } from '../../../assets/img/mex.svg';
import { ReactComponent as DeadIcon } from '../../../assets/img/dead.svg';
import { ReactComponent as EgldIcon } from '../../../assets/img/egld.svg';
import { ReactComponent as ZPayIcon } from '../../../assets/img/zpay.svg';
import { divide, floor } from 'mathjs';
import moment from 'moment';

interface Reward {
  txHash: string;
  action: any;
  value: string;
}

type Rewards = Array<Reward>;

const Rewards = () => {
  const { address, account } = useGetAccountInfo();
  const [rewards, setRewards] = React.useState<Rewards>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (!!elrondApiUrl && address && !!distributionAddress) {
      axios
        .get<any>(
          `${elrondApiUrl}/accounts/${address}/transfers?size=10000&sender=${distributionAddress}&status=success&after=${getLastMonday().unix()}`
        )
        .then((response) => {
          setRewards(response.data);
        });
    }
  }, []);

  const formatBigNumber = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getLastMonday = () => {
    return moment().startOf('isoWeek').startOf('day');
  };

  const getRewardName = (reward: Reward) => {
    return reward.action === undefined
      ? 'EGLD'
      : reward.action?.arguments?.transfers[0]?.name;
  };

  const getRewardValue = (reward: Reward) => {
    return reward.action === undefined
      ? formatBigNumber(divide(parseInt(reward.value), 10 ** 18))
      : formatBigNumber(
          floor(
            divide(
              parseInt(reward.action?.arguments?.transfers[0]?.value),
              !!reward.action?.arguments?.transfers[0]?.decimals
                ? 10 ** reward.action?.arguments?.transfers[0]?.decimals
                : 1
            )
          )
        );
  };

  return (
    <div>
      <h3>
        My weekly rewards &nbsp;
        <FontAwesomeIcon icon={faGift} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          {rewards === undefined && (
            <div>
              <div className='spinner-border text-primary mr-2' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          {rewards !== undefined && rewards.length === 0 && (
            <div>
              <i>Since {getLastMonday().format('YYYY-MM-DD')}:</i>
              <div>No weekly rewards found !</div>
            </div>
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
                  {reward.action?.arguments?.transfers[0]?.name === 'ZPAY' && (
                    <ZPayIcon className='mx-1' height={16} width={16} />
                  )}
                  {reward.action === undefined && (
                    <EgldIcon className='mx-1' height={16} width={16} />
                  )}
                  {getRewardName(reward)}:&nbsp;
                  {getRewardValue(reward)}
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
