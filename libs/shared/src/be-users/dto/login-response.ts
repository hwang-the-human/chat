import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@app/shared/be-users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  access_token: string;
}
