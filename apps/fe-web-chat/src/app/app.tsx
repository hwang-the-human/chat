import './App.css';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Routes, Route } from 'react-router-dom';
import {
  PreBuiltUIList,
  SuperTokensConfig,
} from '../configs/superTokens.config';
import Main from '../components/pages/main/main';

SuperTokens.init(SuperTokensConfig);

export default function App() {
  return (
    <SuperTokensWrapper>
      <div className="App app-container">
        <div className="fill">
          <Routes>
            {/* This shows the login UI on "/auth" route */}
            {getSuperTokensRoutesForReactRouterDom(
              require('react-router-dom'),
              PreBuiltUIList
            )}

            <Route
              path="/"
              element={
                /* This protects the "/" route so that it shows
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                <SessionAuth>
                  <Main />
                </SessionAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </SuperTokensWrapper>
  );
}
