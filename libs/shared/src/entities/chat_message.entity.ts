import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ChatMessage {
  @PrimaryColumn()
  @Field((type) => Int)
  message_from: number;

  @PrimaryColumn()
  @Field((type) => Int)
  message_to: number;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
