import { ShoppingCart, Search, ArrowUpRight } from "lucide-react";
import NavBar from "@/components/website/NavBar";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { PRODUCTS } from "@/Api/Api";
import { Link } from "react-router-dom";
import { useSonner } from "@/hooks/use-sonner";
import { useTranslation } from "react-i18next";
import PaginationCom from "@/components/pagination/Pagination";

/* ── inject Google Fonts once ── */
if (!document.getElementById("pw-fonts")) {
  const l = document.createElement("link");
  l.id = "pw-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600&display=swap";
  document.head.appendChild(l);
}

/* ── Star row ── */
function StarRow({ rating = 0, reviews }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={12} height={12} viewBox="0 0 12 12">
          <polygon
            points="6,1 7.8,4.2 11.5,4.7 8.8,7.2 9.5,11 6,9.1 2.5,11 3.2,7.2 0.5,4.7 4.2,4.2"
            fill={i < Math.round(rating) ? "#EF9F27" : "#e5e7eb"}
          />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">
        {rating}
        {reviews !== undefined ? ` (${Number(reviews).toLocaleString()})` : ""}
      </span>
    </div>
  );
}

/* ── Rank badge (top 3) ── */
const RANK_STYLE = {
  1: { bg: "bg-yellow-200", color: "text-yellow-900" },
  2: { bg: "bg-gray-300", color: "text-gray-700" },
  3: { bg: "bg-orange-200", color: "text-orange-900" },
};
function RankBadge({ rank }) {
  const s = RANK_STYLE[rank];
  if (!s) return null;
  return (
    <div
      className={`absolute top-2.5 left-2.5 w-6 h-6 rounded-full ${s.bg} ${s.color} flex items-center justify-center text-xs font-semibold z-10`}
    >
      #{rank}
    </div>
  );
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-3.5 flex flex-col gap-2.25">
        <div className="h-2 w-2/5 rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
        <div className="h-2 w-1/2 rounded bg-gray-200" />
        <div className="flex justify-between items-center mt-0.5">
          <div className="h-4 w-2/5 rounded bg-gray-200" />
          <div className="h-7 w-1/3 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

/* ── Product card ── */
function ProductCard({ pro, rank, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { t } = useTranslation();
  const discounted = pro.price - (pro.discount || 0);

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
      className={`bg-white rounded-2xl overflow-hidden relative transition-all duration-200 cursor-pointer ${
        hovered
          ? "border-gray-300 -translate-y-1 shadow-lg"
          : "border-gray-200 shadow-sm"
      } border`}
    >
      <RankBadge rank={rank} />

      {pro.discount > 0 && (
        <div className="absolute top-2.5 right-2.5 bg-red-500 text-red-50 text-xs font-semibold p-1 rounded-full z-10 tracking-tighter">
          −${pro.discount}
        </div>
      )}

      {/* Image */}
      <div className="h-64 bg-gray-100 relative overflow-hidden">
        <img
          src={pro.images?.[0]?.image || "/placeholder.png"}
          alt={pro.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Hover actions */}
        <div
          className={`absolute bottom-2.5 right-2.5 flex gap-1.5 transition-all duration-200 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <button
            onClick={handleAdd}
            title={t("Add to Cart")}
            className={`w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center text-sm shadow-md transition-all bg-white hover:bg-black hover:text-white `}
          >
            {<ShoppingCart size={14} />}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-0.5">
          {pro.category}
        </p>
        <p
          title={pro.title}
          className={`text-sm font-medium line-clamp-2 leading-snug mb-2 transition-colors ${"text-gray-900"}`}
        >
          {pro.title}
        </p>

        <StarRow rating={pro.rating} />

        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-gray-900">
              ${discounted}
            </span>
            {pro.discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${pro.price}
              </span>
            )}
          </div>
          <Link
            to={`/productShop/${pro.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`flex items-center gap-1 text-xs font-medium px-3 py-1.25 rounded-full border transition-all ${
                hovered
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {t("View")} <ArrowUpRight size={12} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function ProductWeb() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(9);
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const totalPages = Math.ceil(total / limit);
  const showToast = useSonner();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.total);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, limit]);

  useEffect(() => {
    Axios.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("product")) || [];
    const idx = cart.findIndex((i) => i.id === product.id);
    if (idx >= 0) cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("product", JSON.stringify(cart));
    showToast(t("Adding to Cart"));
  }

  const visible = products.filter((p) => p.images?.length > 0);

  return (
    <>
      <style>{`@keyframes pw-pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>

      <div className="min-h-screen bg-gray-100">
        <NavBar />

        <main
          className="max-w-5xl mx-auto pt-28 pb-16 px-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* ── Header ── */}
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                {t("Our Collection")}
              </p>
              <h1
                className="text-4xl font-semibold text-gray-900 leading-tight m-0"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("Popular Products")}
              </h1>
            </div>
            {!loading && total > 0 && (
              <p className="text-sm text-gray-400">
                {t("Showing")}{" "}
                <span className="font-semibold text-gray-900">
                  {visible.length}
                </span>{" "}
                {t("of")}{" "}
                <span className="font-semibold text-gray-900">{total}</span>{" "}
                {t("products")}
              </p>
            )}
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { label: t("Total Products"), value: total || "—" },
              { label: t("Categories"), value: categories.length || "—" },
              { label: t("Avg. Rating"), value: "4.7 ★" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-gray-200 rounded-xl p-3.5 text-center"
              >
                <p className="text-xs text-gray-600 mb-0.5">{s.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Search + Category pills ── */}
          <div className="flex flex-wrap gap-2.5 mb-5 items-center">
            <div className="relative flex-1 min-w-40">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={t("Search products...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9.5 pl-8 p-4  rounded-full border border-gray-200 bg-white text-xs text-gray-900 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            ) : visible.length > 0 ? (
              visible.map((pro, idx) => (
                <ProductCard
                  key={pro.id}
                  pro={pro}
                  rank={idx < 3 ? idx + 1 : null}
                  onAddToCart={addToCart}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-center">
                <span className="text-5xl">🛍️</span>
                <p className="text-base font-semibold text-gray-900">
                  {t("No products found")}
                </p>
                <p className="text-sm text-gray-400">
                  {t("Try adjusting your search or filter")}
                </p>
              </div>
            )}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <PaginationCom
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          )}
        </main>
      </div>
    </>
  );
}
