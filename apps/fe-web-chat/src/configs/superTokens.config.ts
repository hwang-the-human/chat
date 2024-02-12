import ThirdParty, { Google } from 'supertokens-auth-react/recipe/thirdparty';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import Session from 'supertokens-auth-react/recipe/session';

export const SuperTokensConfig = {
  appInfo: {
    appName: 'Chat',
    apiDomain: process.env.NX_BE_AUTH_URL || '',
    websiteDomain: process.env.NX_FE_WEB_CHAT_URL || '',
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
