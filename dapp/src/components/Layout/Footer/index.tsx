import { deadBrothersClubUrl } from 'config';
import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';

const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        {/* <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href={deadBrothersClubUrl}
        >
          Made with <HeartIcon className='mx-1' /> by DeadBrothers Club.
        </a> */}
        <span>Copyright © 2022 Elrond Sentry Guards - All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
