import { Test, TestingModule } from '@nestjs/testing';
import { ChatMessagesResolver } from './chat-messages.resolver';

describe('ChatMessagesResolver', () => {
  let resolver: ChatMessagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatMessagesResolver],
    }).compile();

    resolver = module.get<ChatMessagesResolver>(ChatMessagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
