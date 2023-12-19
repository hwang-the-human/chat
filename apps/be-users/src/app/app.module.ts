import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import * as SuperTokensConfig from '../configs/superTokens.config';
import { UsersModule } from '../users/users.module';
import { UsersResolver } from '../users/users.resolver';

@Module({
  imports: [
    UsersModule,
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: SuperTokensConfig.connectionUri,
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: SuperTokensConfig.appInfo,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
