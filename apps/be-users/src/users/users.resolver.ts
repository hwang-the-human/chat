import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '@app/shared/entities/user.entity';
import { UsersService } from './users.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';
import { CreateUserInput } from './dto/register-user.input';
import { MessagePattern } from '@nestjs/microservices';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @MessagePattern('get_user')
  @Query(() => [User])
  findAllUsers(): Promise<User[]> {
    console.log('AAAA');
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
