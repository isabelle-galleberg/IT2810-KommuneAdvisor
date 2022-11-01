import { gql } from '@apollo/client';

/**
 * Post a new review for a kommune
 * @param kommuneId id of the kommune to post a review for
 * @param name user input for kommune name
 * @param rating user input for kommune rating
 * @param title user input for kommune title
 * @param description user input for kommune description
 */
export const POST_REVIEW = gql`
  mutation (
    $name: String!
    $rating: Int!
    $title: String!
    $description: String!
    $kommuneId: ID!
  ) {
    addKommuneRating(
      name: $name
      rating: $rating
      title: $title
      description: $description
      kommuneId: $kommuneId
    ) {
      _id
      timestamp
    }
  }
`;

/**
 * get all reviews for a kommune
 * @param id id of the kommune to get reviews for
 * @returns array with name, rating, title, description and timestamp
 */
export const GET_REVIEWS = gql`
  query Kommune($id: String) {
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
