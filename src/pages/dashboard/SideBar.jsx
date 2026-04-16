import { useState, useEffect } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";

export default function SideBar({ isOpen, toggleSidebar }) {
  const [active, setActive] = useState("");
  const location = useLocation();

  // keep the active menu item in sync with the current URL so that
  // refreshing the page or landing directly on a route still highlights
  // the correct entry.
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/dashboard/dashboardlayout")) {
      setActive("Dashboard");
    } else if (path.includes("/dashboard/users")) {
      setActive("Users");
    } else if (path.includes("/dashboard/categories")) {
      setActive("Categories");
    } else if (path.includes("/dashboard/product")) {
      setActive("Products");
    } else {
      // default or clear if none matches
      setActive("");
    }
  }, [location]);

  return (
    <>
      {/* Overlay للشاشات الصغيرة */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* SideBar */}
      <aside
        className={`fixed md:relative bg-white transition-all duration-300 z-50 md:z-0
          ${isOpen ? "w-[200px]" : "-translate-x-full"}
          md:translate-x-0 md:w-55 left-0 top-0 h-screen md:h-auto p-5`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && <h2 className="text-lg font-bold">Admin</h2>}
          <button onClick={toggleSidebar} className="md:hidden">
            <MdOutlineSpaceDashboard className="text-[20px] cursor-pointer text-black border border-solid border-gray-300 rounded-md p-1 hover:bg-slate-100" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-3 flex flex-col gap-1 text-sm font-semibold text-black">
          {/* Dashboard */}
          <Link to={"/dashboard/dashboardlayout"}>
            <Item
              label="Dashboard"
              icon={<MdOutlineDashboard className="text-[18px]" />}
              active={active === "Dashboard"}
              isOpen={isOpen}
              onClick={() => setActive("Dashboard")}
            />
          </Link>

          {/* Users */}
          <Link to={"/dashboard/users"}>
            <Item
              label="Users"
              icon={<MdOutlinePersonOutline className="text-[18px]" />}
              active={active === "Users"}
              isOpen={isOpen}
              onClick={() => setActive("Users")}
            />
          </Link>

          {/* categories */}
          <Link to={"/dashboard/categories"}>
            <Item
              label="Categories"
              icon={<MdOutlineCategory className="text-[18px]" />}
              active={active === "Categories"}
              isOpen={isOpen}
              onClick={() => setActive("Categories")}
            />
          </Link>
          {/* categories */}
          {/* product */}
          <Link to={"/dashboard/product"}>
            <Item
              label="Products"
              icon={<MdOutlineShoppingCart className="text-[18px]" />}
              active={active === "Products"}
              isOpen={isOpen}
              onClick={() => setActive("Products")}
            />
          </Link>
          {/* product */}
        </nav>
      </aside>
    </>
  );
}

function Item({ label, icon, active, isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer
        ${!isOpen ? "justify-center" : ""}
        ${active ? "bg-slate-100 text-black" : "text-black hover:bg-slate-100"}
      `}
    >
      <span className="text-xl">{icon}</span>
      <span
        className={`transition-all duration-300 overflow-hidden whitespace-nowrap
          ${isOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 ml-0"}
        `}
      >
        {label}
      </span>
    </button>
  );
}
