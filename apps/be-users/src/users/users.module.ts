import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ChatEntity, ChatMessageEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
