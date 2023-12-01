/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
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
  loginUser: LoginResponse;
  registerUser: UserEntity;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  createUserInput: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  findAllUsers: Array<UserEntity>;
  findUserById: UserEntity;
  removeUserById: UserEntity;
};


export type QueryFindUserByIdArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryRemoveUserByIdArgs = {
  userId: Scalars['Int']['input'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FindAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllUsersQuery = { __typename?: 'Query', findAllUsers: Array<{ __typename?: 'UserEntity', id: string, firstName: string }> };


export const FindAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<FindAllUsersQuery, FindAllUsersQueryVariables>;