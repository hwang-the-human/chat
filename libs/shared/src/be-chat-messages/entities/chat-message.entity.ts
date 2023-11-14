import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/shared/be-users/entities/user.entity';

@Entity()
@ObjectType()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  senderId: number;

  @Column()
  @Field(() => Int)
  receiverId: number;

  @OneToOne(() => User, (user) => user.chatSender)
  @Field(() => User)
  @JoinColumn()
  sender: User;

  @OneToOne(() => User, (user) => user.chatReceiver)
  @JoinColumn()
  @Field(() => User)
  receiver: User;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
