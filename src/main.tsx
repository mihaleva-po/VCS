import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import client from './apollo-client.ts';
import { ApolloProvider } from '@apollo/client';
import {
  DropdownProvider,
  FontsVTBGroup,
  LIGHT_THEME,
} from '@admiral-ds/react-ui';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={LIGHT_THEME}>
          <DropdownProvider>
            <FontsVTBGroup />
            <BrowserRouter>
              <ApolloProvider client={client}>
                <App />
              </ApolloProvider>
            </BrowserRouter>
          </DropdownProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
