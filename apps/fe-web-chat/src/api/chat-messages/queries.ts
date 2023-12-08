import { graphql } from '../../graphql/gql';

export const findUserChatMessages = graphql(`
  query findUserChatMessages(
    $senderId: Int!
    $options: PaginationChatMessageOptionsInput
  ) {
    findUserChatMessages(senderId: $senderId, options: $options) {
      totalItems
      items {
        id
        content
        createdAt
        sender {
          id
          firstName
          lastName
        }
        receiver {
          id
          firstName
          lastName
        }
      }
    }
  }
`);
