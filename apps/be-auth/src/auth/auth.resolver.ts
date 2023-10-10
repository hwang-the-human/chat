import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '@app/common/users/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.authService.registerUser(createUserInput);
  }
}
