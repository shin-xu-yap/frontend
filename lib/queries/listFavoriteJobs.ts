import { gql } from "@apollo/client";

export const LIST_FAVORITE_JOBS = gql`
  query ListFavoriteJobs($userId: Int!) {
    listFavorites(userId: $userId) {
      job {
        id
        title
        company
        location
        salary
        industry
      }
    }
  }
`;
