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

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, UserEntity, ChatMessageEntity]),
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
