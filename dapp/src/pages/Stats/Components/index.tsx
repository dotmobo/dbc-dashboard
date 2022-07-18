import * as React from 'react';
import Stats from './Stats';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  nftsCollectionMintName,
  nftsDawnCollectionMintName,
  omniscientUrl1,
  omniscientUrl2
} from 'config';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <hr />
      <h3>
        Stats&nbsp;
        <FontAwesomeIcon icon={faChartBar} className='text' />
      </h3>
      {!!omniscientUrl1 && (
        <Stats title={nftsCollectionMintName} url={omniscientUrl1} />
      )}
      {!!omniscientUrl2 && (
        <Stats title={nftsDawnCollectionMintName} url={omniscientUrl2} />
      )}
    </div>
  );
};

export default Components;
