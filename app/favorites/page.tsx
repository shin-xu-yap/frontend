/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@apollo/client";
import { LIST_FAVORITE_JOBS } from "@/lib/queries/listFavoriteJobs";
import { Job } from "@/types/job";
import JobModal from "@/components/JobModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import JobTableBase from "@/components/JobTableBase";

const USER_ID = 1;

export default function FavoriteJobsTable() {
  const { data, loading } = useQuery(LIST_FAVORITE_JOBS, {
    variables: { userId: USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const jobs: Job[] = data?.listFavorites?.map((f: any) => f.job) ?? [];

  const columns: ColumnDef<Job>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "salary", header: "Salary" },
    { accessorKey: "industry", header: "Industry" },
    { id: "actions", header: "Actions", cell: ({ row }) => <JobModal jobId={row.original.id} /> },
    {
      id: "unfavorite",
      header: "Unfavorite",
      cell: ({ row }) => (
        <Button variant="destructive" size="sm">
          Unfavorite
        </Button>
      ),
    },
  ];

  return (
    <JobTableBase
      title="My Favorite Jobs"
      jobs={jobs}
      columns={columns}
      isLoading={loading}
      emptyMessage={
        <div className="text-center">
          No favorite jobs yet
          <div className="mt-4">
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        </div>
      }
      headerActions={
        <Link href="/jobs">
          <Button variant="secondary">Back to Jobs</Button>
        </Link>
      }
    />
  );
}
