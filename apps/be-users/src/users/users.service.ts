import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@app/common/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(user_id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: user_id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async removeUserById(user_id: number): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: user_id });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete({ id: user_id });

    return user;
  }
}
