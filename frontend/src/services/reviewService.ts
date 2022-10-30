import { gql } from '@apollo/client';

export const POST_REVIEW = gql`
  mutation (
    $name: String!
    $rating: Int!
    $title: String!
    $description: String!
    $kommuneId: ID!
  ){
    addKommuneRating(
      name: $name,
      rating: $rating,
      title: $title,
      description: $description,
      kommuneId: $kommuneId
      ){
        _id
        timestamp
    }
  }
`;

export const GET_REVIEWS = gql`
  query Kommune($id: String){
    kommune(id: $id) {
      kommuneRating {
          name
          rating
          title
          description
          timestamp
          _id
      }
    }
  }
`;
