import { dAppName } from 'config';
import FloorPrice from 'pages/FloorPrice';
import Game from 'pages/Game';
import Game2 from 'pages/Game2';
import Game3 from 'pages/Game3';
import Links from 'pages/Links';
import Market from 'pages/Market';
import Stake1Multiple1 from 'pages/Stake1Multiple1';
import Stake1Solo1 from 'pages/Stake1Solo1';
import Stake1Solo2 from 'pages/Stake1Solo2';
import Stake2Solo1 from 'pages/Stake2Solo1';
import Stake3Solo1 from 'pages/Stake3Solo1';
import Stats from 'pages/Stats';
import TokenStake1 from 'pages/TokenStake1';
import withPageTitle from './components/PageTitle';
import Dao from './pages/Dao';
import Dashboard from './pages/Dashboard';
import Farms from './pages/Farms';
import Home from './pages/Home';
import Transaction from './pages/Transaction';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  farms: '/farms',
  floorprice: '/floor-price',
  dao: '/dao',
  market: '/market',
  stake1solo1: '/stake1solo1',
  stake1solo2: '/stake1solo2',
  stake1multiple1: '/stake1multiple1',
  stake2solo1: '/stake2solo1',
  stake3solo1: '/stake3solo1',
  tokenstake1: '/tokenstake1',
  stats: '/stats',
  links: '/links',
  game: '/game',
  game2: '/game2',
  game3: '/game3',
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
    path: routeNames.stake1solo1,
    title: 'Stake 1 Solo 1',
    component: Stake1Solo1,
    authenticatedRoute: true
  },
  {
    path: routeNames.stake1solo2,
    title: 'Stake 1 Solo 2',
    component: Stake1Solo2,
    authenticatedRoute: true
  },
  {
    path: routeNames.stake1multiple1,
    title: 'Stake 1 Multiple 1',
    component: Stake1Multiple1,
    authenticatedRoute: true
  },
  {
    path: routeNames.stake2solo1,
    title: 'Stake 2 Solo 1',
    component: Stake2Solo1,
    authenticatedRoute: true
  },
  {
    path: routeNames.stake3solo1,
    title: 'Stake 3 Solo 1',
    component: Stake3Solo1,
    authenticatedRoute: true
  },
  {
    path: routeNames.tokenstake1,
    title: 'Token Stake 1',
    component: TokenStake1,
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
  },
  {
    path: routeNames.game3,
    title: 'Game 3',
    component: Game3,
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
