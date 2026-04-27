import { MdOutlineShoppingCart } from "react-icons/md";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Cookie from "cookie-universal";

import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { CAT } from "@/Api/Api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronRight, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import TranslateBtn from "../Button/TranslateBtn";
import AccountBtn from "../Button/AccountBtn";
import { Button } from "../ui/button";

/* ── inject fonts once ── */
if (!document.getElementById("nb-fonts")) {
  const l = document.createElement("link");
  l.id = "nb-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600&display=swap";
  document.head.appendChild(l);
}

const NAV_LINKS = [
  { name: "STORE", to: "/ProductWeb" },
  { name: "COLLECTION", dropdown: true },
  { name: "TOP RATED", to: "/topRated" },
];

export default function NavBar() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  console.log(token);

  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data.slice(0, 6)));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("product") || "[]");
    setCartCount(cart.reduce((s, i) => s + (i.quantity || 1), 0));
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/92 border-b border-gray-200 shadow-sm"
            : "bg-white/75 border-b border-transparent"
        }`}
        style={{
          backdropFilter: "blur(14px)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-[13px] no-underline">
            <div className="w-[30px] h-[30px] rounded-[10px] bg-gray-900 flex items-center justify-center">
              <MdOutlineShoppingCart className="text-white text-[18px]" />
            </div>
            <span className="text-[18px] font-semibold text-gray-900 tracking-tighter">
              N7LY
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="items-center md:gap-8 gap-1 flex">
            {NAV_LINKS.map((item) =>
              item.dropdown ? (
                <NavigationMenu key={item.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className="text-sm font-medium text-gray-600 bg-transparent px-3 py-1.5 rounded-lg tracking-wide hover:text-gray-900"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {t(item.name)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div
                          className="p-5 w-[340px] rounded-lg"
                          style={{
                            animation: "nb-slide-down 0.2s ease",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                            {t("Browse Categories")}
                          </p>
                          <div className="grid grid-cols-3 gap-2.5">
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/products?category=${cat.id}`}
                                className="flex flex-col items-center gap-1.5 p-2 border border-gray-100 rounded-[10px] no-underline bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
                              >
                                <img
                                  src={cat.image}
                                  alt={cat.title}
                                  className="w-[52px] h-[52px] object-cover rounded-lg"
                                />
                                <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">
                                  {cat.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <button
                            onClick={() => nav("/CategorieWeb")}
                            className="w-full mt-3.5 py-2 px-4 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-medium cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {t("View All Categories")}{" "}
                            <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg tracking-tight transition-colors duration-150 no-underline ${
                    isActive(item.to)
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {t(item.name)}
                </Link>
              ),
            )}
          </div>

          {/* ── Right actions ── */}
          <div className="hidden md:flex items-center gap-3">
            <TranslateBtn />

            {/* Cart icon */}
            <Link to="/shopping" className="relative flex">
              <div className="w-9 h-9 rounded-[10px] border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:border-gray-900 hover:bg-gray-50 transition-all duration-150">
                <MdOutlineShoppingCart className="text-lg text-gray-700" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <AccountBtn />
          </div>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex w-9 h-9 rounded-[10px] border border-gray-200 bg-white items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={18} className="text-gray-700" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/35 backdrop-blur-sm animate-fade-in"
          style={{ zIndex: 60 }}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl flex flex-col overflow-y-auto transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          zIndex: 70,
          fontFamily: "'DM Sans', sans-serif",
          overscrollBehavior: "contain",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <MdOutlineShoppingCart className="text-white text-sm" />
            </div>
            <span className="text-lg font-semibold text-gray-900">N7LY</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center cursor-pointer"
          >
            <X size={15} className="text-gray-700" />
          </button>
        </div>

        {/* Top actions - Cart & Account */}
        <div className="p-4 flex flex-col gap-3 border-b border-gray-100">
          <Link
            to="/shopping"
            onClick={() => setMobileOpen(false)}
            className="no-underline"
          >
            <div className="w-full py-3.5 px-4 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-3 cursor-pointer hover:bg-gray-900 hover:border-gray-900 transition-all duration-200 group">
              <MdOutlineShoppingCart className="text-lg text-gray-700 group-hover:text-white transition-colors duration-200" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-200 flex-1">
                {t("Your Shopping Cart")}
              </span>
              {cartCount > 0 && (
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
          </Link>
          {token == undefined ? (
            <div className="flex flex-col gap-2.5 w-full">
              <Link to={"/login"} className="w-full">
                <Button className="w-full h-11 text-sm font-medium">
                  {t("Log In")}
                </Button>
              </Link>
              <Link to={"/signin"} className="w-full">
                <Button className="w-full h-11 text-sm font-medium">
                  {t("Sign In")}
                </Button>
              </Link>
            </div>
          ) : (
            <AccountBtn />
          )}
        </div>

        {/* Drawer nav links */}
        <div className="px-4 py-3 flex flex-col gap-1.5">
          {NAV_LINKS.filter((i) => !i.dropdown).map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg no-underline text-sm font-medium transition-all duration-150 ${
                isActive(item.to)
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t(item.name)}
              <ChevronRight size={15} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Categories in drawer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3.5">
            {t("COLLECTION")}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex flex-col items-center gap-1.25 p-2 border border-gray-100 rounded-[10px] no-underline bg-white hover:border-gray-300 transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-[46px] h-[46px] object-cover rounded-lg"
                />
                <span className="text-[10px] font-medium text-gray-700 text-center">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              nav("/CategorieWeb");
              setMobileOpen(false);
            }}
            className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium cursor-pointer flex items-center justify-center gap-1.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("View All Categories")} <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Drawer bottom */}
        <div className="mt-auto px-4 py-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500 font-medium">
            {t("Language")}:
          </span>
          <TranslateBtn />
        </div>
      </div>
    </>
  );
}
