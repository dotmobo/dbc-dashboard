import * as React from 'react';

const Stats = ({ title, url }: any) => {
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <div>
            <small className='text-muted'>{title}</small>
          </div>
          <iframe width='100%' height='550' src={url}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Stats;
