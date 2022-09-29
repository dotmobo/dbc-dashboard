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
import {
  dAppLogo,
  dAppName,
  enableFarms,
  enableFloorPrice,
  enableGame,
  enableInfo,
  enableLinks,
  enableMarket,
  enableNftStake1Multiple1,
  enableNftStake1Solo1,
  enableNftStake1Solo2,
  enableNftStake2Solo1,
  enableNftStake3Multiple1,
  enableNftStake3Solo1,
  enableStaking,
  enableStats,
  enableTokenStaking,
  enableVote,
  nftStake1Multiple1Name,
  nftStake1Solo1Name,
  nftStake1Solo2Name,
  nftStake2Solo1Name,
  nftStake3Multiple1Name,
  nftStake3Solo1Name,
  tokenStakingName
} from 'config';
import { routeNames } from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightToBracket,
  faPowerOff,
  faCircle,
  faCircleUser,
  faCircleInfo,
  faPersonBooth,
  faStore,
  faCoins,
  faCrown,
  faSkull,
  faChartBar,
  faTractor,
  faLink,
  faDollar,
  faBone,
  faGamepad,
  faSpaceShuttle,
  faMask,
  faDog,
  faPlane
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
          <img src={dAppLogo} alt={dAppName} height={25} />
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

            {!!enableInfo && (
              <NavDropdown
                title={
                  <span>
                    <span className='linkText mr-2'>Info</span>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='text mr-2'
                    />
                  </span>
                }
              >
                {!!enableFarms && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.farms : routeNames.home}
                  >
                    <span className='mr-2'>Farms &amp; Funds</span>
                    <FontAwesomeIcon icon={faTractor} className='text mr-2' />
                  </NavDropdown.Item>
                )}
                {!!enableFloorPrice && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.floorprice : routeNames.home}
                  >
                    <span className='mr-2'>Floor Price &amp; Mint</span>
                    <FontAwesomeIcon icon={faDollar} className='text mr-2' />
                  </NavDropdown.Item>
                )}
                {!!enableStats && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.stats : routeNames.home}
                  >
                    <span className='mr-2'>Stats</span>
                    <FontAwesomeIcon icon={faChartBar} className='text mr-2' />
                  </NavDropdown.Item>
                )}
                {!!enableLinks && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.links : routeNames.home}
                  >
                    <span className='mr-2'>Links</span>
                    <FontAwesomeIcon icon={faLink} className='text mr-2' />
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            )}

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
              <NavDropdown
                title={
                  <span>
                    <span className='linkText mr-2'>Stake</span>
                    <FontAwesomeIcon icon={faCoins} className='text mr-2' />
                  </span>
                }
              >
                {!!enableNftStake1Solo1 && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.stake1solo1 : routeNames.home}
                  >
                    <span className='mr-2'>{nftStake1Solo1Name}</span>
                    <FontAwesomeIcon icon={faSkull} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-off' />
                  </NavDropdown.Item>
                )}
                {!!enableNftStake1Solo2 && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.stake1solo2 : routeNames.home}
                  >
                    <span className='mr-2'>{nftStake1Solo2Name}</span>
                    <FontAwesomeIcon icon={faSkull} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-off' />
                  </NavDropdown.Item>
                )}
                {!!enableNftStake1Multiple1 && (
                  <NavDropdown.Item
                    as={Link}
                    to={
                      isLoggedIn ? routeNames.stake1multiple1 : routeNames.home
                    }
                  >
                    <span className='mr-2'>{nftStake1Multiple1Name}</span>
                    <FontAwesomeIcon icon={faSkull} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-on' />
                  </NavDropdown.Item>
                )}
                {!!enableNftStake2Solo1 && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.stake2solo1 : routeNames.home}
                  >
                    <span className='mr-2'>{nftStake2Solo1Name}</span>
                    <FontAwesomeIcon icon={faCrown} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-on' />
                  </NavDropdown.Item>
                )}
                {!!enableNftStake3Solo1 && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.stake3solo1 : routeNames.home}
                  >
                    <span className='mr-2'>{nftStake3Solo1Name}</span>
                    <FontAwesomeIcon icon={faBone} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-off' />
                  </NavDropdown.Item>
                )}
                {!!enableNftStake3Multiple1 && (
                  <NavDropdown.Item
                    as={Link}
                    to={
                      isLoggedIn ? routeNames.stake3multiple1 : routeNames.home
                    }
                  >
                    <span className='mr-2'>{nftStake3Multiple1Name}</span>
                    <FontAwesomeIcon icon={faSkull} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-on' />
                  </NavDropdown.Item>
                )}
                {!!enableTokenStaking && (
                  <NavDropdown.Item
                    as={Link}
                    to={isLoggedIn ? routeNames.tokenstake1 : routeNames.home}
                  >
                    <span className='mr-2'>{tokenStakingName}</span>
                    <FontAwesomeIcon icon={faCoins} className='text mr-2' />
                    <FontAwesomeIcon icon={faCircle} className='running-on' />
                  </NavDropdown.Item>
                )}
              </NavDropdown>
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
            {!!enableGame && (
              <NavDropdown
                className='navdropdown-right'
                title={
                  <span>
                    <span className='linkText mr-2'>Play</span>
                    <FontAwesomeIcon icon={faGamepad} className='text mr-2' />
                  </span>
                }
              >
                <NavDropdown.Item
                  as={Link}
                  to={isLoggedIn ? routeNames.game : routeNames.home}
                >
                  <span className='mr-2'>Space Deadbro</span>
                  <FontAwesomeIcon
                    icon={faSpaceShuttle}
                    className='text mr-2'
                  />
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={isLoggedIn ? routeNames.game2 : routeNames.home}
                >
                  <span className='mr-2'>Super Deadbro</span>
                  <FontAwesomeIcon icon={faMask} className='text mr-2' />
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={isLoggedIn ? routeNames.game3 : routeNames.home}
                >
                  <span className='mr-2'>Deadbro&apos;s hound</span>
                  <FontAwesomeIcon icon={faDog} className='text mr-2' />
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {/* Special link for Tikidy */}
            <Link
              className='nav-link'
              to={routeNames.home}
              onClick={(event) => {
                event.preventDefault();
                alert('Work in Progress');
              }}
            >
              <span className='linkText mr-2'>Travel Forum</span>
              <FontAwesomeIcon icon={faPlane} className='text mr-2' />
            </Link>
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
