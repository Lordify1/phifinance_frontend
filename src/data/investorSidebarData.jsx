import { FaBriefcase, FaHome, FaUser, FaSignOutAlt, FaStar } from "react-icons/fa";


export const investorSidebar = [
    { 
        label: "Dashboard",
        path: "/dashboard",
        icon: <FaHome className="text-[var(--secondary)]"/>,
        method: "get"
    },
    { 
        label: "Explore Project",
        path: "/project",
        icon: <FaBriefcase className="text-[var(--secondary)]"/>,
        method: "get"
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUser className="text-[var(--secondary)]"/>,
      seperate: true,
      first: true,
      method: "get"
    },
    {
      label: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt className="text-[var(--danger)]"/>,
      seperate: true,
      method: "post",
      button: 'button'
    },
];