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

@Entity('chatMessages')
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
  @Field(() => Int)
  senderId: number;

  @Column()
  @Field(() => Int)
  receiverId: number;

  @ManyToMany(() => UserEntity, (user) => user.chatMessageSender)
  @JoinColumn()
  @Field(() => UserEntity)
  sender: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.chatMessageReceiver)
  @JoinColumn()
  @Field(() => UserEntity)
  receiver: UserEntity;
}
