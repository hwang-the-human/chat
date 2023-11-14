import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  firstName: string;

  @IsAlpha()
  @Field()
  lastName: string;

  @IsPhoneNumber()
  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
