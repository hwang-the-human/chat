import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ChatEntity, MessageEntity]),
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
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
