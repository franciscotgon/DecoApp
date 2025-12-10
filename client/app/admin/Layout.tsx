import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminLayoutContainer>
        <AdminHeader />
        <main className="p-6">{children}</main>
      </AdminLayoutContainer>
    </div>
  );
}
