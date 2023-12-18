import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql/',
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       findMyMessages: {
    //         keyArgs: false,
    //         merge(existing = [], incoming) {
    //           return [...existing, ...incoming];
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
