import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class ChatMessagesResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
