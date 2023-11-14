import { InputType, Field } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsPhoneNumber()
  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
