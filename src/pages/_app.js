import { Auth0Provider } from "@auth0/auth0-react";
import { CacheProvider } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Head from 'next/head';
import { Provider } from "react-redux";
import { getConfig } from "src/config";
import store from "src/store";
import { theme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';

const clientSideEmotionCache = createEmotionCache();
axios.defaults.withCredentials = true;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const config = getConfig();

  const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    redirectUri:"http://localhost:3000",
  };

  return (
    <Auth0Provider
    {...providerConfig}
  >
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Midpoint
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </Provider>
    </Auth0Provider>

  );
};

export default App;
