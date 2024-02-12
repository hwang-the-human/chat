import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { UsersResolver } from '../users/users.resolver';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
