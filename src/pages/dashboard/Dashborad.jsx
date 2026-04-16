import { Outlet } from "react-router";
import { useState } from "react";
import SideBar from "./SideBar";
import Topbar from "./Topbar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="md:shadow-[0px_0px_2px_0px_#0000002b] w-full rounded-xl md:m-2.5 p-5">
        <Topbar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
}
