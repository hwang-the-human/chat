import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@Entity('messages')
@ObjectType()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  senderId: string;

  @Column()
  @Field(() => Int)
  receiverId: string;

  @ManyToMany(() => UserEntity, (user) => user.chatMessageSender)
  @JoinColumn()
  @Field(() => UserEntity)
  sender: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.chatMessageReceiver)
  @JoinColumn()
  @Field(() => UserEntity)
  receiver: UserEntity;
}
