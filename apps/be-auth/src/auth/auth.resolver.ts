import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '@app/shared/entities/user.entity';
import { CreateUserInput } from './dto/register-user.input';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => User)
  registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.authService.registerUser(createUserInput);
  }

  @Mutation((returns) => LoginResponse)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.loginUser(loginUserInput);
  }
}
