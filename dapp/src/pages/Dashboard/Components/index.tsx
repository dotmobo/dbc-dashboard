import * as React from 'react';
import Rewards from './Rewards';
import Dead from './Dead';
import Bros from './Bros';
import { enableVote } from 'config';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      {/* <hr />
      <Rewards /> */}
      <hr />
      <Dead title='$ESG' />
      <hr />
      <Bros title='Elrond Sentry Guards' />
    </div>
  );
};

export default Components;
