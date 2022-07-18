import {
  nftsCollectionId,
  nftsCollectionMintName,
  nftsCollectionMintUrl,
  nftsDawnCollectionId,
  nftsDawnCollectionMintName,
  nftsDawnCollectionMintUrl,
  nftsLegendaryCollectionId,
  nftsLegendaryCollectionMintName,
  nftsLegendaryCollectionMintUrl
} from 'config';
import * as React from 'react';
import FloorPrice from './FloorPrice';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      <hr />
      <h3>
        Floor Price&nbsp;
        <FontAwesomeIcon icon={faDollarSign} className='text' />
      </h3>
      {!!nftsCollectionId && (
        <FloorPrice
          collectionId={nftsCollectionId}
          title={nftsCollectionMintName}
          mintUrl={nftsCollectionMintUrl}
        />
      )}
      {!!nftsLegendaryCollectionId && (
        <FloorPrice
          collectionId={nftsLegendaryCollectionId}
          title={nftsLegendaryCollectionMintName}
          mintUrl={nftsLegendaryCollectionMintUrl}
        />
      )}
      {!!nftsDawnCollectionId && (
        <FloorPrice
          collectionId={nftsDawnCollectionId}
          title={nftsDawnCollectionMintName}
          mintUrl={nftsDawnCollectionMintUrl}
        />
      )}
    </div>
  );
};

export default Components;
