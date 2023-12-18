import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';
import { UsersService } from './users.service';
import { PaginationUsersResponse } from '@app/shared/be-users/dto/paginate-users-response';
import { PaginationUsersOptionsInput } from '@app/shared/be-users/dto/paginate-users.input';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => PaginationUsersResponse)
  findUsers(
    @Args('options', {
      type: () => PaginationUsersOptionsInput,
      nullable: true,
    })
    options?: PaginationUsersOptionsInput
  ): Promise<PaginationUsersResponse> {
    return this.usersService.findUsers(options);
  }

  @Query(() => UserEntity)
  findUserById(@Args('user_id') user_id: string): Promise<UserEntity> {
    return this.usersService.findUserById(user_id);
  }
}
