import * as React from 'react';
import Components from './Components';
import { enableGame } from 'config';
import TopInfo from 'components/TopInfo';

const Game = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                </div>
              </div>
              {!!enableGame && (
                <div>
                  <Components />
                </div>
              )}
              {!enableGame && (
                <div>
                  <hr />
                  <p>Game is not currently available !</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
