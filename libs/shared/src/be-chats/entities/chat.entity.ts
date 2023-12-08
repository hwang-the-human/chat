import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@Entity('chats')
@ObjectType()
export class ChatEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field(() => Int)
  senderId: number;

  @Column()
  @Field(() => Int)
  receiverId: number;

  @ManyToMany(() => UserEntity, (user) => user.chatSender)
  @JoinColumn()
  @Field(() => UserEntity)
  sender: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.chatReceiver)
  @JoinColumn()
  @Field(() => UserEntity)
  receiver: UserEntity;
}
