import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }
}
