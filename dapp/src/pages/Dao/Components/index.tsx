import * as React from 'react';
import {
  deadTokenId,
  enableVote,
  voteAddress,
  voteAddress2,
  voteFinishData,
  voteNoData,
  voteOwnerAddress,
  voteWithdrawData,
  voteYesData
} from 'config';
import Vote from './Vote';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      {!!enableVote && (
        <div>
          <hr />
          <Vote
            voteAddress={voteAddress}
            voteOwnerAddress={voteOwnerAddress}
            voteYesData={voteYesData}
            voteNoData={voteNoData}
            voteFinishData={voteFinishData}
            voteWithdrawData={voteWithdrawData}
            deadTokenId={deadTokenId}
          />
          <hr />
          <Vote
            voteAddress={voteAddress2}
            voteOwnerAddress={voteOwnerAddress}
            voteYesData={voteYesData}
            voteNoData={voteNoData}
            voteFinishData={voteFinishData}
            voteWithdrawData={voteWithdrawData}
            deadTokenId={deadTokenId}
          />
        </div>
      )}
    </div>
  );
};

export default Components;
