import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const endpoint1 = new HttpLink({
  uri: 'http://localhost:3000/graphql/',
});
const endpoint2 = new HttpLink({
  uri: 'http://localhost:3001/graphql/',
});

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql/',
  cache: new InMemoryCache(),
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
