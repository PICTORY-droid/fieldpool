import { updateJobPostStatusAction } from "../../../../../features/jobs/actions/update-job-post-status-action";
import {
  JOB_POST_STATUS_LABELS,
  JOB_POST_STATUS_VALUES,
} from "../../../../../features/jobs/constants/job-post-status";
import type { JobPostStatus } from "../../../../../features/jobs/types/job-post.types";
import { AdminJobStatusSubmitButton } from "./AdminJobStatusSubmitButton";

type AdminJobStatusFormProps = {
  jobPostId: string;
  currentStatus: JobPostStatus;
};

export function AdminJobStatusForm({
  jobPostId,
  currentStatus,
}: AdminJobStatusFormProps) {
  return (
    <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div>
        <h2 className="text-xl font-bold">상태 변경</h2>
        <p className="mt-1 text-sm text-slate-400">
          구인 공고의 모집 상태를 변경합니다.
        </p>
      </div>

      <form action={updateJobPostStatusAction} className="grid gap-3">
        <input type="hidden" name="jobPostId" value={jobPostId} />

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-300">
            공고 상태
          </span>

          <select
            name="status"
            defaultValue={currentStatus}
            className="h-12 rounded-2xl border border-slate-700 bg-slate-950 px-4 text-sm font-semibold text-slate-100"
          >
            {JOB_POST_STATUS_VALUES.map((status) => (
              <option key={status} value={status}>
                {JOB_POST_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <AdminJobStatusSubmitButton />
      </form>
    </section>
  );
}