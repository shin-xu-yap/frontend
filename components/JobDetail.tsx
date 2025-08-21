/* components/JobDetail.tsx */
"use client";

import { Job } from "@/types/job";

export default function JobDetail({ job }: { job: Job }) {
  return (
    <div className="p-6 max-w-md bg-white shadow-md rounded-xl border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        {job.company && <p className="text-gray-600">{job.company}</p>}
        {job.location && <p className="text-gray-500 text-sm">{job.location}</p>}
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-3 mt-2">
        {job.salary && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            💰 {job.salary.toLocaleString()}
          </span>
        )}
        {job.experienceLevel && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {job.experienceLevel}
          </span>
        )}
        {job.industry && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {job.industry}
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Skills</h3>
        {job.skills?.length ? (
          <div className="flex flex-wrap gap-2">
            {job.skills.map((s, idx) => (
              <span
                key={s.skillId ?? idx}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {s.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No skills listed</p>
        )}
      </div>
    </div>
  );
}
