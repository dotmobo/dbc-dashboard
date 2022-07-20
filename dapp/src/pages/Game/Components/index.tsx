import { gameCart, gameLabel } from 'config';
import * as React from 'react';
import SpaceDeadbro from './SpaceDeadbro';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <SpaceDeadbro title='Space Deadbro' cart={gameCart} label={gameLabel}/>
      </div>
    </div>
  );
};

export default Components;
