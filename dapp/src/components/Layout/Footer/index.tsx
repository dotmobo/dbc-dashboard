import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';

const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://www.deadbrothers.club/'
        >
          Made with <HeartIcon className='mx-1' /> by DeadBrothers Club.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
