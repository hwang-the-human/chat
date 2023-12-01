import { Field, ID, ObjectType, Directive } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { ChatEntity } from '@app/shared/be-chats/entities/chat.entity';
import { ChatMessageEntity } from '@app/shared/be-chat-messages/entities/chat-message.entity';

@Entity('users')
@ObjectType()
@Directive('@key(fields: "id")')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
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

  @OneToOne(() => ChatEntity, (chat) => chat.sender)
  chatSender: ChatEntity;

  @OneToOne(() => ChatEntity, (chat) => chat.receiver)
  chatReceiver: ChatEntity;

  @OneToOne(() => ChatMessageEntity, (chatMessage) => chatMessage.sender)
  chatMessageSender: ChatMessageEntity;

  @OneToOne(() => ChatMessageEntity, (chatMessage) => chatMessage.receiver)
  chatMessageReceiver: ChatMessageEntity;
}
