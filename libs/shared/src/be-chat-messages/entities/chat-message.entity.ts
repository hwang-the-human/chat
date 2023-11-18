import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@Entity('chatMessages')
@ObjectType()
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  senderId: number;

  @Column()
  @Field(() => Int)
  receiverId: number;

  @OneToMany(() => UserEntity, (user) => user.chatMessageSender)
  @Field(() => UserEntity)
  @JoinColumn()
  sender: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.chatMessageReceiver)
  @Field(() => UserEntity)
  @JoinColumn()
  receiver: UserEntity;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
