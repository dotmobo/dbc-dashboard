import * as React from 'react';
import FloorPrice from './FloorPrice';
import Farms from './Farms';
import Rewards from './Rewards';
import Dead from './Dead';
import Bros from './Bros';
import Vote from './Vote';

const DeadBros = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <hr />
      <Vote />
      <hr />
      <FloorPrice />
      <hr />
      <Farms />
      <hr />
      <Rewards />
      <hr />
      <Dead />
      <hr />
      <Bros />
    </div>
  );
};

export default DeadBros;
