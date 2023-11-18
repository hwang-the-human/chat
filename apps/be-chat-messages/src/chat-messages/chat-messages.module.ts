import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ChatMessagesResolver } from './chat-messages.resolver';
import { ChatMessagesService } from './chat-messages.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity, UserEntity, ChatEntity]),
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
