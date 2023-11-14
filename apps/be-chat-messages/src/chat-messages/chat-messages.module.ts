import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { User } from '@app/shared/be-users/entities/user.entity';
import { ChatMessagesResolver } from './chat-messages.resolver';
import { ChatMessagesService } from './chat-messages.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage, User]),
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
