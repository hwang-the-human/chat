import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  user_id: string;

  @IsAlpha()
  @Field()
  firstName: string;

  @IsAlpha()
  @Field()
  lastName: string;

  @IsAlpha()
  @Field()
  imageUrl: string;
}
