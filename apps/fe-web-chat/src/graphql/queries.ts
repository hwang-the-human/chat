import { graphql } from './users/gql';

export const findAllUsers = graphql(`
  query FindAllUsers {
    findAllUsers {
      id
      firstName
    }
  }
`);
