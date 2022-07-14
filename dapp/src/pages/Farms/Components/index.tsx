import { farmsGraphImg, farmsPlanImg } from 'config';
import * as React from 'react';
import Farms from './Farms';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <hr />
      <Farms />
      <hr />
      <h3>Funds graph</h3>
      <img src={farmsGraphImg} alt='farms graph' width='100%' />
      <hr />
      <h3>Funds plan</h3>
      <img src={farmsPlanImg} alt='farms plan' width='100%' />
    </div>
  );
};

export default Components;
