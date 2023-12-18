import { graphql } from '../../graphql/gql';

export const findUserById = graphql(`
  query findUserById($user_id: String!) {
    findUserById(user_id: $user_id) {
      user_id
      firstName
      lastName
      imageUrl
    }
  }
`);

export const findUsers = graphql(`
  query findUsers($options: PaginationUsersOptionsInput) {
    findUsers(options: $options) {
      totalItems
      items {
        user_id
        firstName
        lastName
        imageUrl
      }
    }
  }
`);
