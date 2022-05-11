import * as React from 'react';
import Vote from './Vote';
import { enableVote } from 'config';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      {!!enableVote && (
        <div>
          <hr />
          <Vote />
        </div>
      )}
    </div>
  );
};

export default Components;
