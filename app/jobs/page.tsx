"use client";

import { useQuery } from "@apollo/client";
import { LIST_JOBS } from "@/lib/queries/listJobs";
import { Job, IndustryEnum } from "@/types/job";
import JobModal from "@/components/JobModal";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import JobTableBase from "@/components/JobTableBase";

const USER_ID = 1;

export default function JobTable() {
  const { data, loading } = useQuery(LIST_JOBS, {
    variables: { /* filters, pagination etc */ },
    fetchPolicy: "cache-and-network",
  });

  const jobs: Job[] = data?.jobs?.data ?? [];

  const columns: ColumnDef<Job>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "salary", header: "Salary" },
    { accessorKey: "industry", header: "Industry" },
    { id: "actions", header: "Actions", cell: ({ row }) => <JobModal jobId={row.original.id} /> },
    { id: "favorite", header: "Favorite", cell: ({ row }) => <FavoriteButton job={row.original} userId={USER_ID} /> },
  ];

  return (
    <JobTableBase
      title="Job Listings"
      jobs={jobs}
      columns={columns}
      isLoading={loading}
      headerActions={
        <Link href="/favorites">
          <Button variant="secondary">View Favorites</Button>
        </Link>
      }
    />
  );
}
