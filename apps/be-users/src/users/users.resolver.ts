import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { UsersService } from './users.service';
import { LoginUserInput } from '@app/shared/be-users/dto/login-user.input';
import { LoginResponse } from '@app/shared/be-users/dto/login-response';
import { CreateUserInput } from '@app/shared/be-users/dto/register-user.input';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserEntity])
  findAllUsers(): Promise<UserEntity[]> {
    return this.usersService.findAllUsers();
  }

  @Mutation(() => UserEntity)
  registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<UserEntity> {
    return this.usersService.registerUser(createUserInput);
  }

  @Mutation(() => LoginResponse)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }

  @Query(() => UserEntity)
  removeUserById(
    @Args('userId', { type: () => Int }) userId: number
  ): Promise<UserEntity> {
    return this.usersService.removeUserById(userId);
  }

  @Query(() => UserEntity)
  findUserById(
    @Args('userId', { type: () => Int }) userId: number
  ): Promise<UserEntity> {
    return this.usersService.findUserById(userId);
  }
}
