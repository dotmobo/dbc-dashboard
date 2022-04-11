import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import { contractAddress } from 'config';
import axios from 'axios';

import { faArrowUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

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

const DeadBros = () => {
  const { address, account } = useGetAccountInfo();

  const [bros, setBrosList] = React.useState<TBrosList>();
  const [dead, setDeadToken] = React.useState<Dead>();

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        'https://api.elrond.com/accounts/' +
          address +
          '/nfts?collections=DEADBROS-bf822f'
      )
      .then((response) => {
        setBrosList(response.data);
      });
  }, []);

  React.useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        'https://api.elrond.com/accounts/' + address + '/tokens/DEADBROS-388e63'
      )
      .then((response) => {
        setDeadToken(response.data);
      });
  }, []);

  const staking = () => {
    alert('STAKING WIP ...');
  };

  const vote = () => {
    alert('VOTE WIP ...');
  };

  const play = () => {
    alert('PLAY WIP ...');
  };

  const getAttributes = (bro: Bro): Array<string> => {
    return bro.metadata.attributes.map(
      (x: any) => `${x.trait_type} ${x.value}`
    );
  };

  const getAttributesDiv = (bro: Bro) => {
    return getAttributes(bro).map((attribute) => (
      <div key={attribute}>{attribute}</div>
    ));
  };

  return (
    <div className='col mt-4 col-md-12'>
      <h3>My tokens</h3>
      <div className='row'>
        <div className='col'>
          <div>
            <b>{dead !== undefined && dead.name}: </b>
            {dead !== undefined && Math.floor(dead.balance / 1e18)}
          </div>
        </div>
      </div>
      <hr />
      <h3>My cimetary</h3>
      <div className='row'>
        {bros !== undefined &&
          bros.map((bro) => (
            <div key={bro.identifier} className='col mt-4 mx-auto'>
              <div>
                <b>{bro.name}</b>
              </div>
              <div>Rarity {Math.floor(bro.metadata.rarity.rarityScore)}</div>
              <div>
                <div>
                  <OverlayTrigger
                    key='attributes'
                    placement='right'
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
              <div className='mt-2'>
                <button className='btn-primary' onClick={staking}>
                  STAKE&nbsp;
                  <FontAwesomeIcon icon={faArrowUp} className='text' />
                </button>
                <button className='btn-primary ml-1' onClick={vote}>
                  VOTE&nbsp;
                  <FontAwesomeIcon icon={faCheck} className='text' />
                </button>
                <button className='btn-primary ml-1' onClick={play}>
                  PLAY&nbsp;
                  <FontAwesomeIcon icon={faCheck} className='text' />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeadBros;
