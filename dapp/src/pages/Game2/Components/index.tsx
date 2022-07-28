import { gameCart2 } from 'config';
import * as React from 'react';
import Cart from 'components/Cart';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <Cart title='Super Deadbro' cart={gameCart2} />
        <div className='row'>
          <div className='col-12'>
            <p>
              Keep Super Deadbro alive as long as possible! Accelerate to avoid the flying cars!
            </p>
          </div>
          <div className='col-sm-12 col-md-6'>
            <h4>Gamepad</h4>
            <ul>
              <li>A button to start</li>
              <li>Left stick to move</li>
              <li>X button to accelerate</li>
            </ul>
          </div>
          <div className='col-sm-12 col-md-6'>
            <h4>Keyboard</h4>
            <ul>
              <li>C key to start</li>
              <li>Arrows to move</li>
              <li>X key to accelerate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
