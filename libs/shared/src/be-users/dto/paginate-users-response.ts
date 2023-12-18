import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@ObjectType()
export class PaginationUsersResponse {
  @Field(() => [UserEntity])
  items: UserEntity[];

  @Field(() => Int)
  totalItems: number;
}
