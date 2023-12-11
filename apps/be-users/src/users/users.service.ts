import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from '@app/shared/be-users/dto/create-user.input';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({
      user_id: createUserInput.user_id,
    });

    if (user) return;

    const newUser = this.usersRepository.create(createUserInput);

    return await this.usersRepository.save(newUser);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findUserById(user_id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ user_id: user_id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async removeUserById(user_id: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ user_id: user_id });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete({ user_id: user_id });

    return user;
  }
}
