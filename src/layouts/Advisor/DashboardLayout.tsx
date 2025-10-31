import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { advisorName, advisorUrl, appUrl } from "@/app";

type SidebarItem = {
  label: string;
  path: string;
  icon?: string;
  method?: any,
  button?: string
};

type Props = {
  children: React.ReactNode;
  sidebarData: any;
  sidebarDataType: string;
  title?: string
};

const DashboardLayout = ({children, sidebarData, sidebarDataType, title }: Props) => {
  const { auth } = usePage().props as any;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
    <Head title={title || 'Dashboard'}/>
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 w-60 bg-[#161616] border-r border-gray-800 p-6 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-start justify-between h-[95vh]">
          <div>
            <h1 className="text-2xl font-bold mb-6">{advisorName}</h1>
            <nav className="space-y-4">
              {sidebarData.map((item, idx) => {
                return(
                  <>
                    {item?.method === 'post' ? (
                     <Link
                      key={idx}
                      href={appUrl + item.path}
                      className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition"
                    >
                      <span>{item.icon || "•"}</span>
                      <span>{item.label}</span>
                    </Link>
                    ) : (
                    <Link
                      key={idx}
                      href={advisorUrl + item.path}
                      className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition"
                    >
                      <span>{item.icon || "•"}</span>
                      <h1>{item.label}</h1>
                    </Link>
                    )}
                  </>
                )
              })}
            </nav>
          </div>
        </div>
        {/* Close btn for mobile */}
        <button
          className="absolute top-4 right-4 text-red-500 opacity-20 hover:opacity-100 md:hidden"
          onClick={closeSidebar}
        >
          <FaTimes size={20} />
        </button>
      </aside>

      {/* Overlay (for mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#151414]  bg-opacity-20 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-[#161616] border-b border-gray-800 px-6 py-4 flex items-center justify-between md:justify-end">
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FaBars size={22} />
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="hidden md:block font-medium text-sm text-white">
              {auth?.user?.username || "User"}
            </h1>
            <img src={auth?.user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover shadow-lg" />
          </div>
        </header>

        {/* Page content */}
        <section className="p-6 flex-1">{children}</section>
      </main>
    </div>
    </>
  );
};

export default DashboardLayout;
