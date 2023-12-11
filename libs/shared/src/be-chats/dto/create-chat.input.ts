import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsNumber()
  @Field()
  senderId: string;

  @IsNumber()
  @Field()
  receiverId: string;
}
