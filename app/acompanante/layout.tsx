import CompanionSidebar from "@/components/features/dashboard/CompanionSidebar";

export default function AcompananteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <CompanionSidebar />
      <main className="flex-1 ml-[288px] overflow-auto bg-[#f8fafc]">{children}</main>
    </div>
  );
}
