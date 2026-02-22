import UserSidebar from "@/components/features/dashboard/UserSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <UserSidebar />
      <main className="flex-1 ml-[288px] overflow-auto bg-[#f8fafc]">
        {children}
      </main>
    </div>
  );
}
