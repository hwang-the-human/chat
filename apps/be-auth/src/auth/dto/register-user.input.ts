import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  first_name: string;

  @IsAlpha()
  @Field()
  last_name: string;

  @IsPhoneNumber()
  @Field()
  phone_number: string;

  @Field()
  password: string;
}
