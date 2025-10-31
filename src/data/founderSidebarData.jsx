import { FaBriefcase, FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";


export const founderSidebar = [
    { 
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-[var(--secondary)]"/>
    },
    { 
      label: "Projects",
      path: "/projects",
      icon: <FaBriefcase className="text-[var(--secondary)]"/> 
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUser className="text-[var(--secondary)]"/>,
      seperate: true,
      first: true
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
