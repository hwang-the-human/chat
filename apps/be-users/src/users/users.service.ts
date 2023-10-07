import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

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
