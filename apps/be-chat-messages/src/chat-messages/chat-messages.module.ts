import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ChatMessagesResolver } from './chat-messages.resolver';
import { ChatMessagesService } from './chat-messages.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity, UserEntity, ChatEntity]),
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
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'users',
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CHATS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'chats',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'chats',
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [ChatMessagesService, ChatMessagesResolver],
})
export class ChatMessagesModule {}
