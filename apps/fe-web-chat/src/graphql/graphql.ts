/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type ChatEntity = {
  __typename?: 'ChatEntity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  receiver: UserEntity;
  receiverId: Scalars['Int']['output'];
  sender: UserEntity;
  senderId: Scalars['Int']['output'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  receiver: UserEntity;
  receiverId: Scalars['Int']['output'];
  sender: UserEntity;
  senderId: Scalars['Int']['output'];
};

export type CreateChatInput = {
  receiverId: Scalars['Int']['input'];
  senderId: Scalars['Int']['input'];
};

export type CreateMessageInput = {
  content: Scalars['String']['input'];
  receiverId: Scalars['Int']['input'];
  senderId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  user: UserEntity;
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: ChatEntity;
  createChatMessage: MessageEntity;
  loginUser: LoginResponse;
  registerUser: UserEntity;
};

export type MutationCreateChatArgs = {
  createChatInput: CreateChatInput;
};

export type MutationCreateChatMessageArgs = {
  CreateMessageInput: CreateMessageInput;
};

export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRegisterUserArgs = {
  createUserInput: CreateUserInput;
};

export type PaginationMessageOptionsInput = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type PaginationMessagesResponse = {
  __typename?: 'PaginationMessagesResponse';
  items: Array<MessageEntity>;
  totalItems: Scalars['Int']['output'];
};

export type PaginationChatOptionsInput = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type PaginationChatsResponse = {
  __typename?: 'PaginationChatsResponse';
  items: Array<ChatEntity>;
  totalItems: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllChatMessages: Array<MessageEntity>;
  findAllChats: Array<ChatEntity>;
  findAllUsers: Array<UserEntity>;
  findUserById: UserEntity;
  findUserChatMessages: PaginationMessagesResponse;
  findUserChats: PaginationChatsResponse;
  removeUserById: UserEntity;
};

export type QueryFindUserByIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryFindUserChatMessagesArgs = {
  options?: InputMaybe<PaginationMessageOptionsInput>;
  senderId: Scalars['Int']['input'];
};

export type QueryFindUserChatsArgs = {
  options?: InputMaybe<PaginationChatOptionsInput>;
  senderId: Scalars['Int']['input'];
};

export type QueryRemoveUserByIdArgs = {
  userId: Scalars['Int']['input'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FindUserChatMessagesQueryVariables = Exact<{
  senderId: Scalars['Int']['input'];
  options?: InputMaybe<PaginationMessageOptionsInput>;
}>;

export type FindUserChatMessagesQuery = {
  __typename?: 'Query';
  findUserChatMessages: {
    __typename?: 'PaginationMessagesResponse';
    totalItems: number;
    items: Array<{
      __typename?: 'MessageEntity';
      id: string;
      content: string;
      createdAt: any;
      sender: {
        __typename?: 'UserEntity';
        id: number;
        firstName: string;
        lastName: string;
      };
      receiver: {
        __typename?: 'UserEntity';
        id: number;
        firstName: string;
        lastName: string;
      };
    }>;
  };
};

export type FindUsersChatsQueryVariables = Exact<{
  senderId: Scalars['Int']['input'];
  options?: InputMaybe<PaginationChatOptionsInput>;
}>;

export type FindUsersChatsQuery = {
  __typename?: 'Query';
  findUserChats: {
    __typename?: 'PaginationChatsResponse';
    totalItems: number;
    items: Array<{
      __typename?: 'ChatEntity';
      id: number;
      sender: {
        __typename?: 'UserEntity';
        id: number;
        firstName: string;
        lastName: string;
      };
      receiver: {
        __typename?: 'UserEntity';
        id: number;
        firstName: string;
        lastName: string;
      };
    }>;
  };
};

export type FindAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllUsersQuery = {
  __typename?: 'Query';
  findAllUsers: Array<{
    __typename?: 'UserEntity';
    id: number;
    firstName: string;
  }>;
};

export const FindUserChatMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findUserChatMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'senderId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'options' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PaginationMessageOptionsInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findUserChatMessages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'senderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'senderId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'options' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'options' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalItems' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sender' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'receiver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindUserChatMessagesQuery,
  FindUserChatMessagesQueryVariables
>;
export const FindUsersChatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findUsersChats' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'senderId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'options' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PaginationChatOptionsInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findUserChats' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'senderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'senderId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'options' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'options' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalItems' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sender' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'receiver' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindUsersChatsQuery, FindUsersChatsQueryVariables>;
export const FindAllUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findAllUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findAllUsers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindAllUsersQuery, FindAllUsersQueryVariables>;
