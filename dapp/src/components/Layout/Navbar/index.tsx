import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import {
  Navbar as BsNavbar,
  NavItem,
  Nav,
  Container,
  NavDropdown
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName, enableMarket, enableStaking, enableVote } from 'config';
import { routeNames } from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DeadbrothersLogo } from './../../../assets/img/deadbrothers.svg';
import {
  faRightToBracket,
  faPowerOff,
  faCircleUser,
  faCircleInfo,
  faPersonBooth,
  faStore,
  faCoins,
  faChartBar,
  faTractor
} from '@fortawesome/free-solid-svg-icons';

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
              <span className='linkText mr-2'>Board</span>
              <FontAwesomeIcon icon={faCircleUser} className='text mr-2' />
            </Link>

            <NavDropdown
              title={
                <span>
                  <span className='linkText mr-2'>Info</span>
                  <FontAwesomeIcon icon={faCircleInfo} className='text mr-2' />
                </span>
              }
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item>
                <Link
                  className='nav-link'
                  to={isLoggedIn ? routeNames.info : routeNames.home}
                >
                  <span className='mr-2'>Farms &amp; FP</span>
                  <FontAwesomeIcon icon={faTractor} className='text mr-2' />
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                <Link
                  className='nav-link'
                  to={isLoggedIn ? routeNames.stats : routeNames.home}
                >
                  <span className='mr-2'>Stats</span>
                  <FontAwesomeIcon icon={faChartBar} className='text mr-2' />
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            {!!enableVote && (
              <Link
                className='nav-link'
                to={isLoggedIn ? routeNames.dao : routeNames.home}
              >
                <span className='linkText mr-2'>DAO</span>
                <FontAwesomeIcon icon={faPersonBooth} className='text mr-2' />
              </Link>
            )}
            {!!enableStaking && (
              <Link
                className='nav-link'
                to={isLoggedIn ? routeNames.stake : routeNames.home}
              >
                <span className='linkText mr-2'>Stake</span>
                <FontAwesomeIcon icon={faCoins} className='text mr-2' />
              </Link>
            )}
            {!!enableMarket && (
              <Link
                className='nav-link'
                to={isLoggedIn ? routeNames.market : routeNames.home}
              >
                <span className='linkText mr-2'>Market</span>
                <FontAwesomeIcon icon={faStore} className='text mr-2' />
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
          {!isLoggedIn && (
            <NavItem>
              <Link
                to={routeNames.unlock}
                className='btn btn-link'
                data-testid='loginBtn'
              >
                <FontAwesomeIcon icon={faRightToBracket} className='text' />
              </Link>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
