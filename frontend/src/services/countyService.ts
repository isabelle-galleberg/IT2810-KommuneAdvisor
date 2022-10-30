import { gql } from '@apollo/client/core';

export const GET_ALL_COUNTIES = gql`
  query Counties {
    counties {
      _id
      name
    }
  }
`;
