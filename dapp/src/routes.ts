import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Info from './pages/Info';
import Dao from './pages/Dao';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import Market from 'pages/Market';
import Stake from 'pages/Stake';
import Stats from 'pages/Stats';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  info: '/info',
  dao: '/dao',
  market: '/market',
  stake: '/stake',
  stats: '/stats',
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
    path: routeNames.info,
    title: 'Info',
    component: Info,
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
    path: routeNames.stake,
    title: 'Stake',
    component: Stake,
    authenticatedRoute: true
  },
  {
    path: routeNames.stats,
    title: 'Stats',
    component: Stats,
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
