// AdminLayout.tsx
import { Head, Link, usePage } from "@inertiajs/react";
import { sidebarData } from "@/data/sidebarData";
import { PropsWithChildren } from "react";
import { appUrl } from "@/app";

export const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex text-white bg-[#0a0a0a]">
      <Head
      title={'Phi Admin Center'}
      />
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#111111] border-r border-[#1e1e1e] p-6 hidden md:block">
        {sidebarData.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h4 className="uppercase text-gray-500 text-xs mb-3 font-semibold">
              <Link
                href={section.href}
              >
                {section.section}
              </Link>
            </h4>
            {section.items.map((group, gIdx) => (
              <div key={gIdx} className="mb-4">
                <h5 className="text-sm font-medium text-gray-400 mb-2">{group.title}</h5>
                <ul className="space-y-1">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={appUrl + link.href}
                        className="block text-sm px-3 py-2 rounded hover:bg-[#1c1c1c] transition"
                      >
                        {link.name}
                      </Link>
                      {/* Nested children */}
                      {link.children && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {link.children.map((child, cIdx) => (
                            <li key={cIdx}>
                              <Link
                                href={appUrl + child.href}
                                className="block text-sm px-3 py-1 rounded hover:bg-[#1c1c1c]"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};
