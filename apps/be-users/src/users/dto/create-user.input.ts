import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;
}
