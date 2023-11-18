import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';
import { ChatsController } from './chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, UserEntity, ChatMessageEntity]),
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
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsResolver],
})
export class ChatsModule {}
