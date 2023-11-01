import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsNumber()
  @Field()
  sender_id: number;

  @IsNumber()
  @Field()
  receiver_id: number;
}
