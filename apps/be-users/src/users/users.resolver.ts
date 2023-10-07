import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { DeleteResult } from 'typeorm';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Query((returns) => User)
  findUserById(
    @Args('user_id', { type: () => Int }) user_id: number
  ): Promise<User> {
    return this.usersService.findUserById(user_id);
  }

  @Query((returns) => User)
  removeUserById(@Args('user_id') user_id: number): Promise<User> {
    return this.usersService.removeUserById(user_id);
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }
}
