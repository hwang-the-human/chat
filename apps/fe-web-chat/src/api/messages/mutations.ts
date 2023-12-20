import { graphql } from '../../graphql/gql';

export const createMessage = graphql(`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id
      content
      createdAt
      sender {
        user_id
        firstName
        lastName
        imageUrl
      }
      receiver {
        user_id
        firstName
        lastName
        imageUrl
      }
    }
  }
`);
