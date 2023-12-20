import { graphql } from '../../graphql/gql';

export const findMyMessages = graphql(`
  query findMyMessages(
    $senderId: String!
    $receiverId: String!
    $options: PaginationMessageOptionsInput
  ) {
    findMyMessages(
      senderId: $senderId
      receiverId: $receiverId
      options: $options
    ) {
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
