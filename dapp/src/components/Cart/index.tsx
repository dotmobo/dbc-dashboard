import * as React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = ({ title, cart }: any) => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  // Make a button to go fullscreen the iframe
  const fullscreenButton = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    iframe.requestFullscreen();
  };

  return (
    <div>
      <h3>
        {title} <FontAwesomeIcon icon={faGamepad} className='text' />
      </h3>
      <div className='row'>
        <div className='col-12'>
          <button className='btn btn-primary' onClick={fullscreenButton}>
            Play in fullscreen
          </button>
          <iframe
            id='game-iframe'
            src={cart}
            allow='autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated'
            scrolling='no'
            width='100%'
            height='680px'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Cart;
