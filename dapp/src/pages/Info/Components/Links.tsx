import * as React from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Links = () => {
  // use the balance to show lkmex or mex-egld label, because lkfarm token can be on mex-egld farm too ...
  return (
    <div>
      <h3>
        Links&nbsp;
        <FontAwesomeIcon icon={faLink} className='text' />
      </h3>
      <div className='row'>
        <ul>
          <li>
            <a
              href='https://www.deadbrothers.club'
              target='_blank'
              rel='noopener noreferrer'
            >
              Official website
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/dbrothersclub'
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href='https://discord.gg/deadbrothersclub'
              target='_blank'
              rel='noopener noreferrer'
            >
              Discord
            </a>
          </li>
          <li>
            <a
              href='https://t.me/deadbrothersclub'
              target='_blank'
              rel='noopener noreferrer'
            >
              Telegram
            </a>
          </li>
          <li>
            <a
              href='https://instagram.com/deadbrothers.club'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href='https://linktr.ee/deadbrothersclub'
              target='_blank'
              rel='noopener noreferrer'
            >
              Linktree
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Links;
