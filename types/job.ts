// frontend/types/job.ts
export type Skill = {
  skillId: number;
  name: string;
};

export type Job = {
  id: number;
  title: string;
  company?: string;
  location?: string;
  salary?: number;
  industry: IndustryEnum;
  experienceLevel?: string;
  skills?: Skill[];
};

export enum IndustryEnum {
  Software = "Software",
  Manufacturing = "Manufacturing",
  Marketing = "Marketing",
  Education = "Education",
  Retail = "Retail",
  Healthcare = "Healthcare",
  Finance = "Finance",
}

export interface FavoriteJobInput {
  userId: number;
  jobId: number;
}