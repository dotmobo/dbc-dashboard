import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Info from './pages/Farms';
import Dao from './pages/Dao';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import Market from 'pages/Market';
import Stake from 'pages/StakeDawn';
import Stats from 'pages/Stats';
import StakeDawn from 'pages/StakeDawn';
import StakeLegendary from 'pages/StakeLegendary';
import Links from 'pages/Links';
import Farms from './pages/Farms';
import FloorPrice from 'pages/FloorPrice';
import StakeGenesis from 'pages/StakeGenesis';
import Game from 'pages/Game';
import Game2 from 'pages/Game2';
import StakeDawn2 from 'pages/StakeDawn2';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  farms: '/farms',
  floorprice: '/floor-price',
  dao: '/dao',
  market: '/market',
  stakedawn: '/stake',
  stakelegendary: '/stake-legendary',
  stakegenesis: '/stake-genesis',
  stakedawn2: '/stake-dawn-2',
  stats: '/stats',
  links: '/links',
  game: '/game',
  game2: '/game2',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.farms,
    title: 'Farms',
    component: Farms,
    authenticatedRoute: true
  },
  {
    path: routeNames.floorprice,
    title: 'Floor Price',
    component: FloorPrice,
    authenticatedRoute: true
  },
  {
    path: routeNames.dao,
    title: 'DAO',
    component: Dao,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction,
    authenticatedRoute: true
  },
  {
    path: routeNames.market,
    title: 'Market',
    component: Market,
    authenticatedRoute: true
  },
  {
    path: routeNames.stakedawn,
    title: 'Stake Dawn',
    component: StakeDawn,
    authenticatedRoute: true
  },
  {
    path: routeNames.stakegenesis,
    title: 'Stake Genesis',
    component: StakeGenesis,
    authenticatedRoute: true
  },
  {
    path: routeNames.stakelegendary,
    title: 'Stake Legendary',
    component: StakeLegendary,
    authenticatedRoute: true
  },
  {
    path: routeNames.stakedawn2,
    title: 'Stake Dawn 2',
    component: StakeDawn2,
    authenticatedRoute: true
  },
  {
    path: routeNames.stats,
    title: 'Stats',
    component: Stats,
    authenticatedRoute: true
  },
  {
    path: routeNames.links,
    title: 'Links',
    component: Links,
    authenticatedRoute: true
  },
  {
    path: routeNames.game,
    title: 'Game',
    component: Game,
    authenticatedRoute: true
  },
  {
    path: routeNames.game2,
    title: 'Game 2',
    component: Game2,
    authenticatedRoute: true
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title ? `${route.title} • ${dAppName}` : `${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
