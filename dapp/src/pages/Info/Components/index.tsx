import * as React from 'react';
import FloorPrice from './FloorPrice';
import Farms from './Farms';
import Links from './Links';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <hr />
      <FloorPrice />
      <hr />
      <Farms />
      <hr />
      <Links />
    </div>
  );
};

export default Components;
