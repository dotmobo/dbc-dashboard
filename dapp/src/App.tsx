import React from 'react';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import * as DappUI from '@multiversx/sdk-dapp/UI';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import routes from 'routes';
import { elrondNetwork } from 'config';

const environment = elrondNetwork;

const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
  DappCorePages: { UnlockPage }
} = DappUI;

const App = () => {
  return (
    <Router>
      <DappProvider
        environment={environment}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout: 6000,
          walletConnectV2ProjectId: '665bf9d46b3bc3ac3e776136245a8c6a'
        }}
      >
        <Layout>
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className='custom-class-for-modals' />
          <Routes>
            <Route
              path={routeNames.unlock}
              element={<UnlockPage loginRoute={routeNames.dashboard} />}
            />
            {routes.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </DappProvider>
    </Router>
  );
};

export default App;
