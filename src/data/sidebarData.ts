import { appUrl } from "@/app";

// sidebarData.ts
export const sidebarData = [
  {
    section: "Phi Website",
    href: appUrl,
    items: [
      {
        title: "Main",
        links: [
          { name: "Dashboard", href: "/admin/dashboard" },
          {
            name: "Newsletter",
            href: "/admin/newsletter/",
            children: [
              { name: "Subscribers", href: "/admin/newsletter/subscribers" },
              { name: "Send Newsletter", href: "/admin/newsletter/send" },
            ],
          },
        ],
      },
      {
        title: "Sections",
        links: [
          { name: "Partners", href: "/admin/partners" },
          { name: "Team", href: "/admin/team" },
        ],
      },
      {
        title: "Settings",
        links: [{ name: "Profile", href: "/admin/settings/profile" }],
      },
    ],
  },
  {
    section: "AI Website",
    href: "/",
    items: [
      {
        title: "Main",
        links: [{ name: "Coming Soon", href: "......" }],
      },
    ],
  },
];
