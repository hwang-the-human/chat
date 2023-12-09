import './App.css';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Routes, Route } from 'react-router-dom';
import {
  PreBuiltUIList,
  SuperTokensConfig,
  ComponentWrapper,
} from '../configs/superTokens.config';
import Main from '../components/pages/main/main';

SuperTokens.init(SuperTokensConfig);

export default function App() {
  return (
    <SuperTokensWrapper>
      <ComponentWrapper>
        <div className="App app-container">
          <div className="fill">
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(
                require('react-router-dom'),
                PreBuiltUIList
              )}

              <Route
                path="/"
                element={
                  <SessionAuth>
                    <Main />
                  </SessionAuth>
                }
              />
            </Routes>
          </div>
        </div>
      </ComponentWrapper>
    </SuperTokensWrapper>
  );
}
