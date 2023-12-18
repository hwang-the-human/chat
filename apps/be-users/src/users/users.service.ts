import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from '@app/shared/be-users/dto/create-user.input';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { PaginationUsersResponse } from '@app/shared/be-users/dto/paginate-users-response';
import { PaginationUsersOptionsInput } from '@app/shared/be-users/dto/paginate-users.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findUsers(
    options?: PaginationUsersOptionsInput
  ): Promise<PaginationUsersResponse> {
    const take = options?.limit || 10;
    const skip = options?.page || 0;

    const [result, total] = await this.usersRepository.findAndCount({
      // order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      items: result,
      totalItems: total,
    };
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({
      user_id: createUserInput.user_id,
    });

    if (user) return;

    const newUser = this.usersRepository.create(createUserInput);

    return await this.usersRepository.save(newUser);
  }

  async findUserById(user_id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ user_id: user_id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
