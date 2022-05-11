import * as React from 'react';
import FloorPrice from './FloorPrice';
import Farms from './Farms';
import Links from './Links';
import { omniscientUrl } from 'config';
import Stats from './Stats';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <hr />
      <Farms />
      <hr />
      <FloorPrice />
      <hr />
      <Stats />
      <hr />
      <Links />
    </div>
  );
};

export default Components;
