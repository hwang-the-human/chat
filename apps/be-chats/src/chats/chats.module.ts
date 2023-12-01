import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { ChatsController } from './chat.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, UserEntity, ChatMessageEntity]),
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
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'USERS_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'users',
              brokers: [configService.get<string>('KAFKA_BROKER')],
              ssl: {
                ca: [configService.get<string>('SSL_CA')],
                key: configService.get<string>('SSL_KEY'),
                cert: configService.get<string>('SSL_CERT'),
              },
            },
            consumer: {
              groupId: 'users',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsResolver],
})
export class ChatsModule {}
