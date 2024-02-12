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

@Module({
  providers: [SupertokensService],
  exports: [],
  controllers: [],
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
      imports: [
        ClientsModule.registerAsync([
          {
            imports: [ConfigModule],
            name: 'USERS_SERVICE',
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  brokers: [configService.get<string>('KAFKA_BROKER')],
                  // ssl: {
                  //   ca: [configService.get<string>('SSL_CA')],
                  //   key: configService.get<string>('SSL_KEY'),
                  //   cert: configService.get<string>('SSL_CERT'),
                  // },
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      module: AuthModule,
    };
  }
}
