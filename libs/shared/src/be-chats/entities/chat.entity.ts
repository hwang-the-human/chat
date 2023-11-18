import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '@app/shared/be-users/entities/user.entity';

@Entity('chats')
@ObjectType()
export class ChatEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  senderId: number;

  @Column()
  @Field(() => Int)
  receiverId: number;

  @OneToOne(() => UserEntity, (user) => user.chatSender)
  @Field(() => UserEntity)
  @JoinColumn()
  sender: UserEntity;

  @OneToOne(() => UserEntity, (user) => user.chatReceiver)
  @Field(() => UserEntity)
  @JoinColumn()
  receiver: UserEntity;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
