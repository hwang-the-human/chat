import { graphql } from '../../graphql/gql';

export const findMyMessages = graphql(`
  query findMyMessages(
    $senderId: String!
    $options: PaginationMessageOptionsInput
  ) {
    findMyMessages(senderId: $senderId, options: $options) {
      totalItems
      items {
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
  }
`);
