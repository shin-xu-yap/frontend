/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

// --- Generic GraphQL request helper ---
async function gqlRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL Error:", json.errors);
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

// ===============================
// JOB QUERIES
// ===============================

export interface SearchRequest {
  search?: string;
  industry?: string;
  sortBySalary?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export async function fetchJobs(params?: {
  search?: string;
  industry?: string;
  sortBySalary?: string;
  page?: number;
  limit?: number;
}) {
  const query = `
    query Jobs(
      $search: String, 
      $industry: Industry, 
      $sortBySalary: String, 
      $page: Int, 
      $limit: Int
    ) {
      jobs(
        filter: { search: $search, industry: $industry, sortBySalary: $sortBySalary },
        page: $page,
        limit: $limit
      ) {
        data {
          id
          title
          company
          location
          salary
          industry
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

  // Only include provided params in variables
  const variables: any = {};
  if (params?.search) variables.search = params.search;
  if (params?.industry) variables.industry = params.industry;
  if (params?.sortBySalary) variables.sortBySalary = params.sortBySalary;
  if (params?.page) variables.page = params.page;
  if (params?.limit) variables.limit = params.limit;

  const data = await gqlRequest<{ jobs: { data: any[]; total: number; page: number; limit: number } }>(
    query,
    variables
  );

  return data.jobs;
}

export async function fetchJob(id: number) {
  const query = `
    query Job($id: Int!) {
      job(id: $id) {
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
    }
  `;

  return gqlRequest<{ job: any }>(query, { id }).then((res) => res.job);
}

// ===============================
// FAVORITE JOBS
// ===============================
export async function fetchFavorites(userId: number) {
  const query = `
    query Favorites($userId: Int!) {
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

  const data = await gqlRequest<{ listFavorites: any[] }>(query, { userId });
  return data.listFavorites;
}

export async function addFavorite(userId: number, jobId: number) {
  const mutation = `
    mutation AddFavorite($userId: Int!, $jobId: Int!) {
      addFavorite(input: { userId: $userId, jobId: $jobId })
    }
  `;

  return gqlRequest<{ addFavorite: boolean }>(mutation, { userId, jobId });
}

export async function removeFavorite(userId: number, jobId: number) {
  const mutation = `
    mutation RemoveFavorite($userId: Int!, $jobId: Int!) {
      removeFavorite(input: { userId: $userId, jobId: $jobId }) {
        jobId
      }
    }
  `;

  return gqlRequest<{ removeFavorite: { jobId: number } }>(mutation, { userId, jobId });
}

