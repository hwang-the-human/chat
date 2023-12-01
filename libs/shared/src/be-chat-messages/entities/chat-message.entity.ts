import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
@Directive('@key(fields: "id")')
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
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
