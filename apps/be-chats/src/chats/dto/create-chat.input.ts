import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsNumber()
  @Field()
  senderId: number;

  @IsNumber()
  @Field()
  receiverId: number;
}
