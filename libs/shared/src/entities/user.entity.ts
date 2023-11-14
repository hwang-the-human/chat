import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Chat } from '@app/shared/entities/chat.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  password: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToOne(() => Chat, (chat) => chat.sender)
  chatSender: Chat;

  @OneToOne(() => Chat, (chat) => chat.receiver)
  chatReceiver: Chat;
}
