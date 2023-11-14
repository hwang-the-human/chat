import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsNumber()
  @Field(() => Int)
  senderId: number;

  @IsNumber()
  @Field(() => Int)
  receiverId: number;
}
