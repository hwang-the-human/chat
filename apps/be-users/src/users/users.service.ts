import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    const user = new User();
    user.id = 1;
    user.first_name = 'Nikolay';
    user.last_name = 'Khvan';

    return [user];
  }
}
