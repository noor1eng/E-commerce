import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { CAT } from "@/Api/Api";
import { Link } from "react-router-dom";
import NavBar from "@/components/website/NavBar";
import PaginationCom from "../pagination/Pagination";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white animate-pulse">
      <div className="aspect-[5/4] bg-slate-100" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-1/2 rounded-md bg-slate-100" />
        <div className="h-3 w-1/3 rounded-md bg-slate-100" />
      </div>
    </div>
  );
}

/* ── Category card ── */
function CategoryCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className="group block focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
          hovered
            ? "border-slate-300 shadow-lg -translate-y-1"
            : "border-slate-200 shadow-sm translate-y-0",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
          <img
            src={cat.image}
            alt={cat.title}
            className={cn(
              "size-full object-cover transition-transform duration-500",
              hovered ? "scale-105" : "scale-100",
            )}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top-left count badge */}
          {cat.count > 0 && (
            <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              {cat.count} {t("items")}
            </span>
          )}

          {/* Trending badge */}
          {cat.trending && (
            <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              🔥 {t("Trending")}
            </span>
          )}

          {/* Bottom overlay: title + button */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="text-lg font-semibold text-white drop-shadow mb-2 truncate">
              {t(cat.title)}
            </h3>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
                hovered
                  ? "bg-white text-slate-900"
                  : "bg-white/20 text-white backdrop-blur-sm",
              )}
            >
              {t("Shop Now")}
              <ArrowUpRight
                className={cn(
                  "size-3 transition-transform duration-300",
                  hovered ? "translate-x-0.5 -translate-y-0.5" : "",
                )}
              />
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-xs text-slate-400 truncate max-w-[70%]">
            {t("Explore our collection")}
          </p>
          <ArrowRight
            className={cn(
              "size-3.5 text-slate-400 transition-all duration-300 shrink-0",
              hovered ? "translate-x-1 text-slate-700" : "",
            )}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function CategorieWeb() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCategories(res.data.data);
        setTotal(res.data.total);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, limit]);

  return (
    <>
      <NavBar />
      <div className="minh-screen bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {t("Browse")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("Shop by Category")}
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-md leading-relaxed">
                {t("Discover products across our most popular categories")}
              </p>
            </div>

            {/* Stats strip */}
            <div className="flex shrink-0 items-center gap-6">
              {[
                { label: t("Categories"), value: total || "—" },
                { label: t("Page"), value: `${page} / ${totalPages || "—"}` },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-bold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Thin divider */}
          <div className="mb-8 h-px bg-slate-200" />

          {/* ── Grid ── */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            ) : categories.length > 0 ? (
              categories.map((cat) => <CategoryCard key={cat.id} cat={cat} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <LayoutGrid className="size-6 text-slate-400" />
                </div>
                <p className="text-base font-semibold text-slate-700">
                  {t("No categories found")}
                </p>
                <p className="text-sm text-slate-400">
                  {t("Check back soon for new collections")}
                </p>
              </div>
            )}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-10">
              <PaginationCom
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            </div>
          )}

          {/* ── CTA ── */}
          <div className="mt-12 flex justify-center">
            <Link to="/ProductWeb">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full border-slate-300 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
              >
                ← {t("Back to Shopping")}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
