import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '@app/shared/entities/user.entity';

@Entity()
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => Int)
  sender_id: number;

  @Column()
  @Field((type) => Int)
  receiver_id: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;
}
