import { AuthGuard } from "@goldlabelapps/saas";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}