import { adminLogoutAction } from "../../../server/security/admin-logout-action";

export function AdminLogoutButton() {
  return (
    <form action={adminLogoutAction}>
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-2xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-700"
      >
        로그아웃
      </button>
    </form>
  );
}