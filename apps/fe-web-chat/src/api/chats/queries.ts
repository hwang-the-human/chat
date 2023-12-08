import { graphql } from '../../graphql/gql';

export const findUsersChats = graphql(`
  query findUsersChats($senderId: Int!, $options: PaginationChatOptionsInput) {
    findUserChats(senderId: $senderId, options: $options) {
      totalItems
      items {
        id
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
