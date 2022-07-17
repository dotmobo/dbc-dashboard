import * as React from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { links } from 'config';

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
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.url} target='_blank' rel='noopener noreferrer'>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Links;
