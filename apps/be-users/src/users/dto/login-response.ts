import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'apps/be-users/src/users/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  access_token: string;
}
