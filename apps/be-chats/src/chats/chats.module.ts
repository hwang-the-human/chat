import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '@app/shared/be-chats/entities/chat.entity';
import { User } from '@app/shared/be-users/entities/user.entity';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, User]),
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
  controllers: [],
  providers: [ChatsService, ChatsResolver],
})
export class ChatsModule {}
