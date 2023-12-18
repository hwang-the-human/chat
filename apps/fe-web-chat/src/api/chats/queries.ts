import { graphql } from '../../graphql/gql';

export const findMyChats = graphql(`
  query findMyChats($senderId: String!, $options: PaginationChatOptionsInput) {
    findMyChats(senderId: $senderId, options: $options) {
      totalItems
      items {
        id
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
  }
`);
