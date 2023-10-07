import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  findUserById(@Args('user_id') user_id: number): Promise<User> {
    return this.usersService.findUserById(user_id);
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }
}
