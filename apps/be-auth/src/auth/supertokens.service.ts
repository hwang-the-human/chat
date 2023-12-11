import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { ClientKafka } from '@nestjs/microservices';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { CreateUserInput } from '@app/shared/be-users/dto/create-user.input';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        UserMetadata.init(),
        ThirdParty.init({
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                signInUp: async function (input) {
                  let res = await originalImplementation.signInUp(input);

                  if (res.status === 'OK') {
                    const { given_name, family_name, picture } =
                      res.rawUserInfoFromProvider.fromUserInfoAPI;

                    usersClient.emit('users.create', {
                      user_id: res.user.id,
                      firstName: given_name,
                      lastName: family_name,
                      imageUrl: picture,
                    } satisfies CreateUserInput);
                  }

                  return res;
                },
              };
            },
          },

          signInAndUpFeature: {
            providers: [
              {
                config: {
                  thirdPartyId: 'google',
                  clients: [
                    {
                      clientId: process.env.GOOGLE_CLIENT,
                      clientSecret: process.env.GOOGLE_SECRET,
                      scope: [
                        'https://www.googleapis.com/auth/userinfo.email',
                        'https://www.googleapis.com/auth/userinfo.profile',
                      ],
                    },
                  ],
                },
              },
            ],
          },
        }),
        Session.init(),
      ],
    });
  }
}
