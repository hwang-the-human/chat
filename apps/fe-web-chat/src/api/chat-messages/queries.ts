import { graphql } from '../../graphql/gql';

export const findUserChatMessages = graphql(`
  query findUserChatMessages(
    $senderId: Int!
    $options: PaginationMessageOptionsInput
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
