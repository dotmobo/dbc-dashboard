import React from 'react';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import * as DappUI from '@multiversx/sdk-dapp/UI';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {
  const {
    ExtensionLoginButton,
    WebWalletLoginButton,
    LedgerLoginButton,
    WalletConnectLoginButton
  } = DappUI;
  const { isLoggedIn } = useGetLoginInfo();

  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, [isLoggedIn]);

  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <ExtensionLoginButton
              loginButtonText={'Extension'}
              {...commonProps}
            />
            <WebWalletLoginButton
              loginButtonText={'Web wallet'}
              {...commonProps}
            />
            <LedgerLoginButton
              loginButtonText={'Ledger'}
              className={'test-class_name'}
              {...commonProps}
            />
            <WalletConnectLoginButton
              loginButtonText={'Maiar'}
              isWalletConnectV2={true}
              {...commonProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
