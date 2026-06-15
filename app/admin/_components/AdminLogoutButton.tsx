import { adminLogoutAction } from "../../../server/security/admin-logout-action";
import { AdminLogoutSubmitButton } from "./AdminLogoutSubmitButton";

export function AdminLogoutButton() {
  return (
    <form action={adminLogoutAction}>
      <AdminLogoutSubmitButton />
    </form>
  );
}