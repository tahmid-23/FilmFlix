import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { PropsWithChildren, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithNavigate = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const onRedirectCallback = useCallback(
    (appState?: AppState) => {
      navigate(appState?.returnTo || window.location.pathname);
    },
    [navigate]
  );

  return (
    <Auth0Provider
      domain="dev-1grxamuresxko6xk.us.auth0.com"
      clientId="wL7V7wgXmF9iRDakEr4Mpqz3KJW8dkCs"
      authorizationParams={{
        audience: 'HackUMBC',
        redirect_uri: window.location.origin + '/feed'
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
