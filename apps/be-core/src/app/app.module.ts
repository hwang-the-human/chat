import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from '../messages/messages.module';
import { EventsModule } from '../events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesResolver } from '../messages/messages.resolver';
import { MessagesService } from '../messages/messages.service';
import { ChatsResolver } from '../chats/chats.resolver';
import { ChatsModule } from '../chats/chats.module';
import { ChatsService } from '../chats/chats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity, ChatEntity]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),

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
  controllers: [AppController],
  providers: [
    AppService,
    MessagesModule,
    MessagesResolver,
    MessagesService,
    ChatsResolver,
    ChatsModule,
    ChatsService,
    EventsModule,
  ],
})
export class AppModule {}
