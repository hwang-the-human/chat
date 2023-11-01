import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from 'apps/be-users/src/users/user.entity';
import { UsersService } from './users.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';
import { CreateUserInput } from './dto/register-user.input';

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
    @Args('user_id', { type: () => Int }) user_id: number
  ): Promise<User> {
    return this.usersService.findUserById(user_id);
  }

  @Query(() => User)
  removeUserById(
    @Args('user_id', { type: () => Int }) user_id: number
  ): Promise<User> {
    return this.usersService.removeUserById(user_id);
  }
}
