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

  @OneToOne(() => UserEntity, (user) => user.chatSender)
  @JoinColumn()
  @Field(() => UserEntity)
  sender: UserEntity;

  @OneToOne(() => UserEntity, (user) => user.chatReceiver)
  @JoinColumn()
  @Field(() => UserEntity)
  receiver: UserEntity;
}
