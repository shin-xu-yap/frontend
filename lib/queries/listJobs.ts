import { gql } from "@apollo/client";

export const LIST_JOBS = gql`
  query Jobs($filter: JobFilterInput, $page: Int, $limit: Int) {
    jobs(filter: $filter, page: $page, limit: $limit) {
      data {
        id
        title
        company
        location
        salary
        industry
        experienceLevel
        skills {
          skillId
          name
        }
      }
      total
      page
      limit
    }
  }
`;

export const GET_JOB = gql`
  query GetJob($id: Int!) {
    job(id: $id) {
      id
      title
      company
      location
      salary
      industry
      experienceLevel
      skills {
        skill {
          id
          name
        }
      }
    }
  }
`;
