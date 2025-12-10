export default function AdminLayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="ml-64 min-h-screen bg-gray-100">{children}</div>;
}
