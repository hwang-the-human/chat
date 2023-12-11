import { Controller } from '@nestjs/common';

import { UsersService } from './users.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { CreateUserInput } from '@app/shared/be-users/dto/create-user.input';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.get')
  async findUserById(user_id: string) {
    const user = await this.usersService.findUserById(user_id);
    return JSON.stringify(user);
  }

  @EventPattern('users.create')
  async createUser(createUserInput: CreateUserInput) {
    const user = await this.usersService.createUser(createUserInput);
    return JSON.stringify(user);
  }
}
