import { Field, ID, ObjectType, Directive, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
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
  @PrimaryColumn()
  @Field()
  user_id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  imageUrl: string;

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
