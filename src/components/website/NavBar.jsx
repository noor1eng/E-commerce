import { MdOutlineShoppingCart } from "react-icons/md";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { CAT } from "@/Api/Api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0.75)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid #e5e7eb"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.06)" : "none",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              textDecoration: "none",
            }}
          >
            <div className=" w-[30px] h-[30px] rounded-[10px] bg-[#111827] flex items-center justify-center">
              <MdOutlineShoppingCart className="text-[#fff] text-[18px]" />
            </div>
            <span className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
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
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#374151",
                          letterSpacing: "0.04em",
                          background: "transparent",
                          padding: "6px 12px",
                        }}
                      >
                        {t(item.name)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div
                          style={{
                            padding: "1.25rem",
                            width: 340,
                            animation: "nb-slide-down 0.2s ease",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          <p
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "#9ca3af",
                              marginBottom: 12,
                            }}
                          >
                            {t("Browse Categories")}
                          </p>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: 10,
                            }}
                          >
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/products?category=${cat.id}`}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: 6,
                                  padding: "8px 4px",
                                  borderRadius: 10,
                                  border: "1px solid #f3f4f6",
                                  textDecoration: "none",
                                  transition:
                                    "border-color 0.15s, background 0.15s",
                                  background: "#fff",
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.borderColor = "#d1d5db";
                                  e.currentTarget.style.background = "#f9fafb";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.borderColor = "#f3f4f6";
                                  e.currentTarget.style.background = "#fff";
                                }}
                              >
                                <img
                                  src={cat.image}
                                  alt={cat.title}
                                  style={{
                                    width: 52,
                                    height: 52,
                                    objectFit: "cover",
                                    borderRadius: 8,
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 500,
                                    color: "#374151",
                                    textAlign: "center",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {cat.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <button
                            onClick={() => nav("/CategorieWeb")}
                            style={{
                              width: "100%",
                              marginTop: 14,
                              padding: "9px 0",
                              borderRadius: 100,
                              border: "1px solid #e5e7eb",
                              background: "#fff",
                              color: "#374151",
                              fontSize: 13,
                              fontWeight: 500,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 4,
                              fontFamily: "'DM Sans', sans-serif",
                              transition: "all 0.15s",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "#111827";
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.borderColor = "#111827";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = "#fff";
                              e.currentTarget.style.color = "#374151";
                              e.currentTarget.style.borderColor = "#e5e7eb";
                            }}
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
                  className={`nb-link${isActive(item.to) ? " active" : ""}`}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: isActive(item.to) ? "#111827" : "#6b7280",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 8,
                    letterSpacing: "0.03em",
                    transition: "color 0.15s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#111827")}
                  onMouseOut={(e) => {
                    if (!isActive(item.to))
                      e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  {t(item.name)}
                </Link>
              ),
            )}
          </div>

          {/* ── Right actions ── */}
          <div
            className=" md:flex hidden "
            style={{ alignItems: "center", gap: 12 }}
          >
            <TranslateBtn />

            {/* Cart icon */}
            <Link
              to="/shopping"
              style={{ position: "relative", display: "flex" }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#111827";
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <MdOutlineShoppingCart
                  style={{ fontSize: 17, color: "#374151" }}
                />
              </div>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    background: "#E24B4A",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <AccountBtn />
          </div>
          {/* Mobile hamburger */}
          <button
            className=" md:hidden flex"
            onClick={() => setMobileOpen(true)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "#fff",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Menu size={18} color="#374151" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(2px)",
            animation: "nb-fade-in 0.2s ease",
          }}
        />
      )}

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 300,
          zIndex: 70,
          background: "#fff",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'DM Sans', sans-serif",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "#111827",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdOutlineShoppingCart style={{ color: "#fff", fontSize: 16 }} />
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              N7LY
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={15} color="#374151" />
          </button>
        </div>

        {/* Top actions - Cart & Account */}
        <div className="p-4 flex justify-center items-center flex-col gap-3 border-b border-solid border-[#f3f4f6]">
          <Link
            to="/shopping"
            onClick={() => setMobileOpen(false)}
            style={{ position: "relative", flex: 1 }}
          >
            <div
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#111827";
                e.currentTarget.style.borderColor = "#111827";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#f9fafb";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <MdOutlineShoppingCart
                style={{ fontSize: 18, color: "#374151" }}
              />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
                السلة
              </span>
              {cartCount > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#E24B4A",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
          </Link>
          <div className=" flex justify-center items-start flex-col gap-2">
            <Link to={"/login"}>
              <Button>{t("Log In")}</Button>
            </Link>
            <Link to={"/signin"}>
              <Button>{t("Sign In")}</Button>
            </Link>
          </div>
        </div>

        {/* Drawer nav links */}
        <div
          style={{
            padding: "16px 16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.filter((i) => !i.dropdown).map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: 12,
                background: isActive(item.to) ? "#f3f4f6" : "transparent",
                textDecoration: "none",
                color: isActive(item.to) ? "#111827" : "#374151",
                fontSize: 14,
                fontWeight: isActive(item.to) ? 600 : 400,
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => {
                if (!isActive(item.to))
                  e.currentTarget.style.background = "#f9fafb";
              }}
              onMouseOut={(e) => {
                if (!isActive(item.to))
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {t(item.name)}
              <ChevronRight size={15} color="#9ca3af" />
            </Link>
          ))}
        </div>

        {/* Categories in drawer */}
        <div style={{ padding: "20px 16px" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 12,
            }}
          >
            {t("COLLECTION")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  padding: "8px 4px",
                  borderRadius: 10,
                  border: "1px solid #f3f4f6",
                  textDecoration: "none",
                  background: "#fff",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: 46,
                    height: 46,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#374151",
                    textAlign: "center",
                  }}
                >
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
            style={{
              width: "100%",
              marginTop: 12,
              padding: "10px 0",
              borderRadius: 100,
              border: "1px solid #e5e7eb",
              background: "#fff",
              color: "#374151",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {t("View All")} <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Drawer bottom */}
        <div
          style={{
            marginTop: "auto",
            padding: "16px 16px 24px",
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TranslateBtn />
        </div>
      </div>
    </>
  );
}
