import { graphql } from '../../graphql/gql';

export const findAllUsers = graphql(`
  query findAllUsers {
    findAllUsers {
      id
      firstName
    }
  }
`);
