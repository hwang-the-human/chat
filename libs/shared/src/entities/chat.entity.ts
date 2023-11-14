import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@app/shared/entities/user.entity';

@Entity()
@ObjectType()
export class Chat {
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

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
