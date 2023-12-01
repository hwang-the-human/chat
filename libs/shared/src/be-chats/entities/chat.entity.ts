import { Field, Int, ObjectType, Directive, ID } from '@nestjs/graphql';
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
@Directive('@key(fields: "id")')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
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
  @Field(() => UserEntity)
  @JoinColumn()
  sender: UserEntity;

  @OneToOne(() => UserEntity, (user) => user.chatReceiver)
  @Field(() => UserEntity)
  @JoinColumn()
  receiver: UserEntity;
}
