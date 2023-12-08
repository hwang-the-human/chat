import { Field, ID, ObjectType, Directive, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { MessageEntity } from '@app/shared/be-messages/entities/message.entity';

@Entity('users')
@ObjectType()
@Directive('@shareable')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  password: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToMany(() => ChatEntity, (chat) => chat.sender)
  chatSender: ChatEntity;

  @ManyToMany(() => ChatEntity, (chat) => chat.receiver)
  chatReceiver: ChatEntity;

  @ManyToMany(() => MessageEntity, (chatMessage) => chatMessage.sender)
  chatMessageSender: MessageEntity;

  @ManyToMany(() => MessageEntity, (chatMessage) => chatMessage.receiver)
  chatMessageReceiver: MessageEntity;
}
