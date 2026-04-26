import NavBar from "@/components/website/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function WebPages() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
