import { gameCart3 } from 'config';
import * as React from 'react';
import Cart from 'components/Cart';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <div>
        <hr />
        <Cart title="Deadbro's hound" cart={gameCart3} />
        <div className='row'>
          <div className='col-12'>
            <p>
              As a Deadbro&apos;s hound, burn as many humans as possible in hell before emptying the hunger gauge.
            </p>
          </div>
          <div className='col-sm-12 col-md-6'>
            <h4>Gamepad</h4>
            <ul>
              <li>Move up the left stick to start or retry</li>
              <li>Use the left stick to run</li>
              <li>X button to shoot fireballs</li>
              <li>A button to jump</li>
            </ul>
          </div>
          <div className='col-sm-12 col-md-6'>
            <h4>Keyboard</h4>
            <ul>
              <li>Up arrow key to start or retry</li>
              <li>Left/right arrow keys to run</li>
              <li>X key to shoot fireballs</li>
              <li>C key to jump</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
