import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // middleware already guarantees a session exists for anything under /dashboard,
  // but we read it here too so the UI has the user's name without a client fetch.
  const session = getSession();
  const name = session?.name ?? "Jordan Reyes";
  const initials = session?.initials ?? "JR";

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar name={name} initials={initials} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
