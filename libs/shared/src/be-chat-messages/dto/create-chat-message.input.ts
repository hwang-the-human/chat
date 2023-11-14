import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateChatMessageInput {
  @IsNumber()
  @Field(() => Int)
  senderId: number;

  @IsNumber()
  @Field(() => Int)
  receiverId: number;

  @Field()
  content: string;
}
