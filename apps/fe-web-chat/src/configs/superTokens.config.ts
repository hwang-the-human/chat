import ThirdParty, { Google } from 'supertokens-auth-react/recipe/thirdparty';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import Session from 'supertokens-auth-react/recipe/session';

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 4201;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 4200;
  const websiteUrl =
    process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

export const SuperTokensConfig = {
  appInfo: {
    appName: 'Chat',
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    Session.init(),
  ],
};

export const recipeDetails = {
  docsLink: 'https://supertokens.com/docs/thirdparty/introduction',
};

export const PreBuiltUIList = [ThirdPartyPreBuiltUI];
