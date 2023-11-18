import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  access_token: string;
}
