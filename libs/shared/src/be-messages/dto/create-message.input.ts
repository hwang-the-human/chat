import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @IsNumber()
  @Field()
  senderId: string;

  @IsNumber()
  @Field()
  receiverId: string;

  @Field()
  content: string;
}
