import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import photo1 from "../../assets/pexels-marek-kupiec-1696944-11295238.jpg";
import photo2 from "../../assets/pexels-marina-podrez-3269296-11671964.jpg";
import photo3 from "../../assets/pexels-saliemolini-13430493.jpg";
import {
  Search,
  ArrowRight,
  Star,
  TrendingUp,
  ShoppingBag,
  Flame,
  ShoppingCart,
  ArrowUpRight,
  Timer,
  Zap,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import NavBar from "../../components/website/NavBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Axios } from "@/Api/Axios";
import { PRODUCTS } from "@/Api/Api";
import { useSonner } from "@/hooks/use-sonner";

/* ── inject fonts once ── */
if (!document.getElementById("hp-fonts")) {
  const l = document.createElement("link");
  l.id = "hp-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600&display=swap";
  document.head.appendChild(l);
}

const featuredProducts = [
  {
    id: 1,
    name: "Classic Watch",
    image: photo1,
    price: 299,
    rating: 4.9,
    reviews: 128,
    trending: true,
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Premium Headphones",
    image: photo2,
    price: 199,
    rating: 4.8,
    reviews: 256,
    trending: true,
    discount: "Free Shipping",
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Luxury Sunglasses",
    image: photo3,
    price: 159,
    rating: 4.7,
    reviews: 189,
    trending: true,
    discount: "Limited Stock",
    tag: "Premium",
  },
];

/* ── Countdown timer ── */
function useCountdown(targetHours = 12) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = targetHours;
          m = 0;
          s = 0;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ── Star row (SVG) ── */
function StarRow({ rating = 0 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={11} height={11} viewBox="0 0 12 12">
          <polygon
            points="6,1 7.8,4.2 11.5,4.7 8.8,7.2 9.5,11 6,9.1 2.5,11 3.2,7.2 0.5,4.7 4.2,4.2"
            fill={i < Math.round(rating) ? "#EF9F27" : "#e5e7eb"}
          />
        </svg>
      ))}
      <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 3 }}>
        {rating}
      </span>
    </div>
  );
}

/* ── Deal Card ── */
function DealCard({ pro, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { t } = useTranslation();

  const discounted = pro.price - (pro.discount || 0);
  const pct =
    pro.discount > 0 ? Math.round((pro.discount / pro.price) * 100) : 0;

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    onAddToCart(pro);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${hovered ? "#d1d5db" : "#e5e7eb"}`,
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 28px rgba(0,0,0,0.09)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
      }}
    >
      {/* Discount % badge */}
      {pct > 0 && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 2,
            background: "#E24B4A",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 100,
            letterSpacing: "0.02em",
          }}
        >
          -{pct}%
        </div>
      )}

      {/* Image */}
      <div
        style={{
          height: 220,
          background: "#f9fafb",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={pro.images?.[0]?.image || "/placeholder.png"}
          alt={pro.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Add to cart hover btn */}
        <button
          className=" absolute bottom-2 right-2 size-8 rounded-full flex items-center justify-center transition-colors duration-200"
          onClick={handleAdd}
          style={{
            background: added ? "#1D9E75" : "#fff",
            color: added ? "#fff" : "#374151",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: added ? 14 : 13,
            boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.2s, transform 0.2s, background 0.2s",
          }}
        >
          {added ? "✓" : <ShoppingCart size={14} />}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "11px 13px 13px" }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9ca3af",
            marginBottom: 3,
          }}
        >
          {pro.category}
        </p>
        <p
          title={pro.title}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: hovered ? "#4f46e5" : "#111827",
            lineHeight: 1.4,
            marginBottom: 7,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            transition: "color 0.2s",
          }}
        >
          {pro.title}
        </p>

        <StarRow rating={pro.rating} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 9,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#E24B4A" }}>
              ${discounted}
            </span>
            {pro.discount > 0 && (
              <span
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  textDecoration: "line-through",
                }}
              >
                ${pro.price}
              </span>
            )}
          </div>
          <Link
            to={`productShop/${pro.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 500,
                padding: "5px 12px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: hovered ? "#111827" : "#e5e7eb",
                background: hovered ? "#111827" : "#fff",
                color: hovered ? "#fff" : "#374151",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {t("View")} <ArrowUpRight size={12} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Deals Skeleton ── */
function DealSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        animation: "hp-pulse 1.5s ease-in-out infinite",
      }}
    >
      <div style={{ height: 220, background: "#f3f4f6" }} />
      <div
        style={{
          padding: "11px 13px 13px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            height: 9,
            width: "35%",
            borderRadius: 6,
            background: "#f3f4f6",
          }}
        />
        <div
          style={{
            height: 13,
            width: "75%",
            borderRadius: 6,
            background: "#f3f4f6",
          }}
        />
        <div
          style={{
            height: 9,
            width: "50%",
            borderRadius: 6,
            background: "#f3f4f6",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <div
            style={{
              height: 16,
              width: "30%",
              borderRadius: 6,
              background: "#f3f4f6",
            }}
          />
          <div
            style={{
              height: 28,
              width: "26%",
              borderRadius: 100,
              background: "#f3f4f6",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const { t } = useTranslation();
  const showToast = useSonner();
  const countdown = useCountdown(11);

  /* carousel auto-play */
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    onSelect();
    return () => carouselApi.off("select", onSelect);
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    const id = setInterval(() => carouselApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [carouselApi]);

  /* fetch discounted products */
  useEffect(() => {
    setLoadingDeals(true);
    Axios.get(`/${PRODUCTS}?limit=8&page=1`)
      .then((res) => {
        const discounted = res.data.data.filter(
          (p) => p.discount > 0 && p.images?.length > 0,
        );
        setDeals(
          discounted.length > 0
            ? discounted
            : res.data.data.filter((p) => p.images?.length > 0).slice(0, 8),
        );
      })
      .catch(console.error)
      .finally(() => setLoadingDeals(false));
  }, []);

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("product")) || [];
    const idx = cart.findIndex((i) => i.id === product.id);
    if (idx >= 0) cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("product", JSON.stringify(cart));
    showToast(t("Adding to Cart"));
  }

  return (
    <>
      <style>{`@keyframes hp-pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>

      <div className="md:shadow-[0px_0px_2px_0px_#0000006b] rounded-xl md:m-1.5">
        <NavBar />

        {/* ══ HERO ══ */}
        <section className="from-background to-accent/20 relative bg-linear-to-b mt-5 md:mt-0">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:px-8 lg:px-12 lg:py-20">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <header className="space-y-8">
                <Badge variant="outline" className="rounded-full px-4 py-2">
                  <TrendingUp className="me-1 !size-4" />
                  {t("New Collection 2025")}
                </Badge>

                <h1 className="text-5xl leading-tight font-bold font-sans text-balance md:text-6xl lg:text-6xl">
                  {t("Discover Your Perfect Style")}
                </h1>

                <p className="text-muted-foreground max-w-lg leading-[1.5] text-xl font-sans text-balance">
                  {t(
                    "Explore our curated collection of premium products. Each piece is handpicked for those who appreciate quality and style.",
                  )}
                </p>

                <div className="relative max-w-md">
                  <Input
                    type="search"
                    placeholder={t("Search products...")}
                    className="h-14 rounded-full pe-4 pl-12 text-lg"
                    aria-label="Search products"
                  />
                  <Search className="text-muted-foreground absolute start-4 top-1/2 size-5 -translate-y-1/2" />
                  <Button
                    size="lg"
                    className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-6"
                  >
                    {t("Search")}
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Link to="/ProductWeb">
                    <Button
                      size="lg"
                      className="cursor-pointer gap-2 rounded-full px-8 py-3 text-lg"
                    >
                      {t("Shop Now")} <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer gap-2 rounded-full px-8 py-3 text-lg"
                  >
                    <ShoppingBag className="size-4" /> {t("View Catalog")}
                  </Button>
                </div>
              </header>

              <div className="flex flex-col gap-4">
                <div className="relative h-[500px] w-full border-0">
                  <Carousel
                    className="group size-full"
                    opts={{
                      align: "start",
                      loop: true,
                      duration: 20,
                      skipSnaps: true,
                    }}
                    setApi={setCarouselApi}
                  >
                    <CarouselContent className="h-full">
                      {featuredProducts.map((product) => (
                        <CarouselItem key={product.id}>
                          <Card className="relative size-full overflow-hidden py-4 text-black">
                            <CardContent className="px-4">
                              <div className="relative size-full overflow-hidden rounded-md flex">
                                <img
                                  src={product.image}
                                  alt={t(product.name)}
                                  className="h-[500px] w-full object-cover"
                                  loading="lazy"
                                />
                                <div className="text-background-foreground absolute inset-0 flex flex-col justify-end p-8 text-black">
                                  <div className="relative z-10 max-w-md space-y-4">
                                    <Badge className="w-fit rounded-full">
                                      {t(product.tag)}
                                    </Badge>
                                    <h2 className="text-5xl font-bold">
                                      {t(product.name)}
                                    </h2>
                                    <p className="text-background-foreground/80 text-xl">
                                      {t(
                                        "Discover the latest in style and comfort with our premium collection.",
                                      )}
                                    </p>
                                    <div className="flex items-center gap-4 pt-2">
                                      <Button
                                        size="lg"
                                        className="cursor-pointer rounded-full"
                                      >
                                        {t("Shop Now")}
                                      </Button>
                                      <div className="text-foreground flex items-center gap-1">
                                        <Star className="fill-foreground size-5" />
                                        <span className="font-medium">
                                          {product.rating}
                                        </span>
                                        <span className="text-foreground/80">
                                          ({product.reviews} {t("reviews")})
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {product.trending && (
                                  <div className="text-background-foreground bg-foreground/10 dark:bg-background/20 absolute end-8 top-8 flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-xs">
                                    <Flame className="size-4" /> {t("Trending")}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <div className="relative mt-8 flex justify-center gap-3">
                    {featuredProducts.map((_, index) => (
                      <button
                        key={index}
                        className={`relative size-2.5 rounded-full transition-all ${activeIndex === index ? "bg-foreground" : "bg-foreground/50"}`}
                        aria-label={t(`Go to slide ${index + 1}`)}
                        onClick={() => {
                          setActiveIndex(index);
                          carouselApi?.scrollTo(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DEALS SECTION ══ */}
        <section
          style={{
            background: "#f9fafb",
            padding: "4rem 1.5rem 5rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginBottom: 4,
                  }}
                >
                  {t("Limited Time")}
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 32,
                    fontWeight: 600,
                    color: "#111827",
                    lineHeight: 1.2,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Zap size={26} color="#E24B4A" />
                  {t("Hot Deals")}
                </h2>
              </div>

              {/* Countdown */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#111827",
                  borderRadius: 14,
                  padding: "10px 18px",
                }}
              >
                <Timer size={14} color="#9ca3af" />
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  {t("Ends in")}
                </span>
                {[pad(countdown.h), pad(countdown.m), pad(countdown.s)].map(
                  (val, i) => (
                    <span
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          background: "#1f2937",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 16,
                          borderRadius: 8,
                          padding: "4px 10px",
                          fontVariantNumeric: "tabular-nums",
                          minWidth: 36,
                          textAlign: "center",
                        }}
                      >
                        {val}
                      </span>
                      {i < 2 && (
                        <span
                          style={{
                            color: "#6b7280",
                            fontWeight: 700,
                            fontSize: 14,
                          }}
                        >
                          :
                        </span>
                      )}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Stats strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginBottom: "1.5rem",
              }}
            >
              {[
                { label: t("Active Deals"), value: deals.length || "—" },
                {
                  label: t("Max Discount"),
                  value: deals.length
                    ? `${Math.max(...deals.map((d) => d.discount || 0))}$`
                    : "—",
                },
                {
                  label: t("Avg. Saving"),
                  value: deals.length
                    ? `${Math.round(deals.reduce((s, d) => s + (d.discount || 0), 0) / deals.length)}$`
                    : "—",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "12px 14px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Deals grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: 16,
                marginBottom: "2rem",
              }}
            >
              {loadingDeals
                ? Array.from({ length: 8 }).map((_, i) => (
                    <DealSkeleton key={i} />
                  ))
                : deals.map((pro) => (
                    <DealCard key={pro.id} pro={pro} onAddToCart={addToCart} />
                  ))}
            </div>

            {/* View all CTA */}
            <div style={{ textAlign: "center" }}>
              <Link to="/ProductWeb">
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "11px 28px",
                    borderRadius: 100,
                    background: "#111827",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "opacity 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {t("View All Deals")} <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
