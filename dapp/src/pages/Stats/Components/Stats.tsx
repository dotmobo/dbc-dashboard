import * as React from 'react';
import { omniscientUrl1, omniscientUrl2 } from 'config';
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
          <iframe width='100%' height='550' src={omniscientUrl1}></iframe>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div>
            <small className='text-muted'>DAWN</small>
          </div>
          <iframe width='100%' height='550' src={omniscientUrl2}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Stats;
