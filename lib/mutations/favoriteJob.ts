import { gql } from '@apollo/client';

export const IS_FAVORITE = gql`
  query IsFavorite($userId: Int!, $jobId: Int!) {
    isFavorite(userId: $userId, jobId: $jobId)
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($input: FavoriteJobInput!) {
    addFavorite(input: $input) {
      userId
      jobId
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($input: FavoriteJobInput!) {
    removeFavorite(input: $input) {
      userId
      jobId
    }
  }
`;
