import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '@app/shared/be-users/entities/user.entity';
import { UsersService } from './users.service';
import { LoginUserInput } from '@app/shared/be-users/dto/login-user.input';
import { LoginResponse } from '@app/shared/be-users/dto/login-response';
import { CreateUserInput } from '@app/shared/be-users/dto/register-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Mutation(() => User)
  registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.registerUser(createUserInput);
  }

  @Mutation(() => LoginResponse)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }

  @Query(() => User)
  findUserById(
    @Args('userId', { type: () => Int }) userId: number
  ): Promise<User> {
    return this.usersService.findUserById(userId);
  }

  @Query(() => User)
  removeUserById(
    @Args('userId', { type: () => Int }) userId: number
  ): Promise<User> {
    return this.usersService.removeUserById(userId);
  }
}
