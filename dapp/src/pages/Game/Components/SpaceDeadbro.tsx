import * as React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pico8 from 'react-pico-8';
import {
  Controls,
  Reset,
  Pause,
  Sound,
  Carts,
  Fullscreen
} from 'react-pico-8/buttons';

const SpaceDeadbro = ({ title, cart, label }: any) => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  return (
    <div>
      <h3>
        {title} <FontAwesomeIcon icon={faGamepad} className='text' />
      </h3>
      <div className='row'>
        <div className='col-12'>
          <Pico8
            src={cart}
            autoPlay={false}
            legacyButtons={true}
            hideCursor={false}
            center={true}
            blockKeys={true}
            usePointer={true}
            unpauseOnReset={true}
            placeholder={label}
          >
            <Controls />
            <Reset />
            <Pause />
            <Sound />
            <Fullscreen />
          </Pico8>
        </div>
      </div>
    </div>
  );
};

export default SpaceDeadbro;
