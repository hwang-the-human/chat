import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_user')
  async findUserById(userId: number) {
    const user = await this.usersService.findUserById(+userId);
    return JSON.stringify(user);
  }
}
