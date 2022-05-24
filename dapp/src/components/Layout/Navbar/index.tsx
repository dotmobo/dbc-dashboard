import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Navbar as BsNavbar, NavItem, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName, enableMarket, enableStaking, enableVote } from 'config';
import { routeNames } from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadbrothersLogo } from './../../../assets/img/deadbrothers.svg';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const isLoggedIn = Boolean(address);

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={isLoggedIn ? routeNames.dashboard : routeNames.home}
        >
          <DeadbrothersLogo className='deadbrothers-logo ' />
          <span className='dapp-name text-muted'>{dAppName}</span>
        </Link>

        <Container>
          <Nav className='me-auto'>
            <Link
              className='nav-link'
              to={isLoggedIn ? routeNames.dashboard : routeNames.home}
            >
              Board
            </Link>
            <Link
              className='nav-link'
              to={isLoggedIn ? routeNames.info : routeNames.home}
            >
              Info
            </Link>
            {!!enableVote && (
              <Link
                className='nav-link'
                to={isLoggedIn ? routeNames.dao : routeNames.home}
              >
                DAO
              </Link>
            )}
            {!!enableMarket && (
              <Link
                className='nav-link'
                to={isLoggedIn ? routeNames.market : routeNames.home}
              >
                Market
              </Link>
            )}
            {!!enableStaking && (
              <Link
                className='nav-link'
                to={isLoggedIn ? routeNames.stake : routeNames.home}
              >
                Stake
              </Link>
            )}
          </Nav>
        </Container>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <NavItem>
              <button
                className='btn btn-link'
                onClick={handleLogout}
                aria-label='Close'
              >
                <FontAwesomeIcon icon={faPowerOff} className='text' />
              </button>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
