import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </label>
      </div>
      <Sidebar />
    </div>
  );
}
