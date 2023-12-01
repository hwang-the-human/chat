import { graphql } from '../../graphql/gql';

export const findAllUsers = graphql(`
  query FindAllUsers {
    findAllUsers {
      id
      firstName
    }
  }
`);
