import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from '@app/shared/be-users/dto/create-user.input';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserEntity])
  findAllUsers(): Promise<UserEntity[]> {
    return this.usersService.findAllUsers();
  }

  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<UserEntity> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => UserEntity)
  removeUserById(
    @Args('user_id', { type: () => Int }) user_id: string
  ): Promise<UserEntity> {
    return this.usersService.removeUserById(user_id);
  }

  @Query(() => UserEntity)
  findUserById(
    @Args('user_id', { type: () => Int }) user_id: string
  ): Promise<UserEntity> {
    return this.usersService.findUserById(user_id);
  }
}
