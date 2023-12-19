import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [SupertokensService],
  exports: [],
  controllers: [],
  imports: [UsersModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
