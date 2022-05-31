import * as React from 'react';
import { omniscientUrl } from 'config';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stats = () => {
  return (
    <div>
      <h3>
        Stats&nbsp;
        <FontAwesomeIcon icon={faChartBar} className='text' />
      </h3>
      <div className='row'>
        <div className='col'>
          <div>
            <small className='text-muted'>GENESIS</small>
          </div>
          <iframe width='100%' height='660' src={omniscientUrl}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Stats;
