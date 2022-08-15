import { CacheProvider } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from "react-redux";
import { SERVER_URL } from 'src/config';
import { setUser } from 'src/store/userSlice';
import store from "src/store";
import { theme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';

const clientSideEmotionCache = createEmotionCache();
axios.defaults.withCredentials = true;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    axios.post(SERVER_URL + '/user/checkauth').then((rsp) => {
      if (!rsp.data.success) {
        store.dispatch(setUser(false));
        return;
      }
      store.dispatch(setUser(rsp.data.user));
    });
  }, [])

  return (
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

  );
};

export default App;
