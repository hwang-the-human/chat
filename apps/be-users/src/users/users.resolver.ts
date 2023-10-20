import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from 'apps/be-users/src/users/user.entity';
import { UsersService } from './users.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';
import { CreateUserInput } from './dto/register-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Mutation((returns) => User)
  registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.registerUser(createUserInput);
  }

  @Mutation((returns) => LoginResponse)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
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
}
