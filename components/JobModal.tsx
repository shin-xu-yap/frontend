"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import JobDetail from "@/components/JobDetail";
import { Job } from "@/types/job";
import { fetchJob } from "@/lib/api";

export default function JobModal({ jobId }: { jobId: number }) {
  const [open, setOpen] = useState(false);
  const [jobDetail, setJobDetail] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    const fetchedJob = await fetchJob(jobId);
    setJobDetail(fetchedJob);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" onClick={handleOpen}>
          View Job
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {loading ? "Loading Job..." : jobDetail?.title ?? "Job Details"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="py-6 text-center">Loading...</p>
        ) : (
          jobDetail && <JobDetail job={jobDetail} />
        )}
      </DialogContent>
    </Dialog>
  );
}
