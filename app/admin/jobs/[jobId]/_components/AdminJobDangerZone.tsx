import { deleteJobPostAction } from "../../../../../features/jobs/actions/delete-job-post-action";
import { AdminJobDeleteSubmitButton } from "./AdminJobDeleteSubmitButton";

type AdminJobDangerZoneProps = {
  jobPostId: string;
};

export function AdminJobDangerZone({ jobPostId }: AdminJobDangerZoneProps) {
  return (
    <section className="rounded-3xl border border-red-500/30 bg-red-950/20 p-6">
      <h2 className="text-xl font-bold text-red-200">위험 작업</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        이 구인 공고를 삭제하면 공고 목록과 상세 화면에서 더 이상 확인할 수
        없습니다. 테스트 공고나 잘못 등록된 공고만 삭제하세요.
      </p>

      <form action={deleteJobPostAction} className="mt-4 grid gap-4">
        <input type="hidden" name="jobPostId" value={jobPostId} />

        <label className="flex gap-3 rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-sm font-semibold leading-6 text-red-100">
          <input
            type="checkbox"
            name="confirmDelete"
            required
            className="mt-1 h-4 w-4"
          />
          <span>삭제하면 되돌릴 수 없다는 것을 확인했습니다.</span>
        </label>

        <AdminJobDeleteSubmitButton />
      </form>
    </section>
  );
}