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
          <div className='embed-responsive embed-responsive-1by1'>
            <iframe
              className='embed-responsive-item'
              src={omniscientUrl}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
