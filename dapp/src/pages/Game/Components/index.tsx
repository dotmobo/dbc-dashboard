import { gameCart } from 'config';
import * as React from 'react';
import Cart from './Cart';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <Cart title='Space Deadbro' cart={gameCart} />
        <div className='row'>
          <div className='col-12'>
            <p>
              The Space Deadbro will save the Elrond community ! Reach 10000
              points to kill the boss and win ! Each coin gives you 500 points and each enemy gives you 100 points.
            </p>
          </div>
          <div className='col-sm-12 col-md-6'>
            <h4>Gamepad</h4>
            <ul>
              <li>A button to start</li>
              <li>Left stick to move</li>
              <li>X button to shoot</li>
            </ul>
          </div>
          <div className='col-sm-12 col-md-6'>
            <h4>Keyboard</h4>
            <ul>
              <li>C key to start</li>
              <li>Arrows to move</li>
              <li>X key to shoot</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
