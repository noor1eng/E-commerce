import { useState } from "react";
import NavBar from "../website/NavBar";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useSonner } from "@/hooks/use-sonner";

const showToast = useSonner();
const products = [
  {
    id: 1,
    rank: 1,
    name: "Wireless Noise-Cancelling Headphones",
    brand: "SoundCore",
    price: 129,
    oldPrice: 179,
    rating: 4.9,
    reviews: 3421,
    cat: "tech",
    emoji: "🎧",
    sale: true,
  },
  {
    id: 2,
    rank: 2,
    name: "Merino Wool Crewneck Sweater",
    brand: "Woolrich",
    price: 89,
    oldPrice: null,
    rating: 4.8,
    reviews: 1892,
    cat: "fashion",
    emoji: "🧥",
    sale: false,
  },
  {
    id: 3,
    rank: 3,
    name: "Ceramic Pour-Over Coffee Set",
    brand: "Hario",
    price: 54,
    oldPrice: 70,
    rating: 4.8,
    reviews: 967,
    cat: "home",
    emoji: "☕",
    sale: true,
  },
  {
    id: 4,
    rank: 4,
    name: "Vitamin C Brightening Serum",
    brand: "INKEY",
    price: 22,
    oldPrice: null,
    rating: 4.7,
    reviews: 5340,
    cat: "beauty",
    emoji: "✨",
    sale: false,
  },
  {
    id: 5,
    rank: 5,
    name: "Ergonomic Desk Chair",
    brand: "Herman Miller",
    price: 495,
    oldPrice: 599,
    rating: 4.7,
    reviews: 2108,
    cat: "home",
    emoji: "🪑",
    sale: true,
  },
  {
    id: 6,
    rank: 6,
    name: "Slim Fit Chino Trousers",
    brand: "Uniqlo",
    price: 39,
    oldPrice: null,
    rating: 4.7,
    reviews: 4512,
    cat: "fashion",
    emoji: "👖",
    sale: false,
  },
  {
    id: 7,
    rank: 7,
    name: "Mechanical Keyboard TKL",
    brand: "Keychron",
    price: 99,
    oldPrice: 119,
    rating: 4.6,
    reviews: 789,
    cat: "tech",
    emoji: "⌨️",
    sale: false,
  },
  {
    id: 8,
    rank: 8,
    name: "SPF 50 Mineral Sunscreen",
    brand: "EltaMD",
    price: 38,
    oldPrice: null,
    rating: 4.6,
    reviews: 6721,
    cat: "beauty",
    emoji: "🧴",
    sale: false,
  },
];

const RANK_STYLES = {
  1: { bg: "bg-yellow-200", color: "text-yellow-900" },
  2: { bg: "bg-gray-300", color: "text-gray-700" },
  3: { bg: "bg-orange-200", color: "text-orange-900" },
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={12} height={12} viewBox="0 0 12 12">
          <polygon
            points="6,1 7.8,4.2 11.5,4.7 8.8,7.2 9.5,11 6,9.1 2.5,11 3.2,7.2 0.5,4.7 4.2,4.2"
            fill={i <= Math.round(rating) ? "#EF9F27" : "#e5e7eb"}
          />
        </svg>
      ))}
    </div>
  );
}

function RankBadge({ rank }) {
  const { bg, color } = RANK_STYLES[rank] ?? {
    bg: "bg-gray-100",
    color: "text-gray-600",
  };
  return (
    <div
      className={`absolute top-2.5 left-2.5 w-6 h-6 rounded-full ${bg} ${color} flex items-center justify-center text-xs font-semibold z-10`}
    >
      #{rank}
    </div>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    showToast(t("Adding to Cart"));
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl border overflow-hidden cursor-pointer relative transition-all duration-200 ${
        hovered
          ? "border-gray-300 transform -translate-y-0.5 shadow-lg"
          : "border-gray-200 shadow-sm"
      }`}
    >
      <RankBadge rank={product.rank} />

      {product.sale && (
        <div className="absolute top-2.5 right-2.5 bg-red-500 text-red-50 text-xs font-semibold px-2 py-0.5 rounded-full z-10 tracking-wider">
          {t("SALE")}
        </div>
      )}

      {/* Image area */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-5xl relative">
        {product.emoji}

        {/* Hover actions */}
        <div
          className={`absolute bottom-2 right-2 flex gap-1.5 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => setWishlisted((w) => !w)}
            title="Wishlist"
            className="w-7 h-7 rounded-full bg-white border border-gray-200 cursor-pointer flex items-center justify-center text-sm transition-colors hover:text-red-500"
          >
            {wishlisted ? "♥" : "♡"}
          </button>
          <button
            title="Quick view"
            className="w-7 h-7 rounded-full bg-white border border-gray-200 cursor-pointer flex items-center justify-center text-xs text-gray-700"
          >
            ◻
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-0.5">
          {product.brand}
        </p>
        <p
          className="text-sm font-medium text-gray-900 leading-snug mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
          title={product.name}
        >
          {product.name}
        </p>

        <div className="flex items-center gap-1 mb-2.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-gray-900">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`w-7 h-7 rounded-full border-none cursor-pointer flex items-center justify-center text-white font-light transition-all duration-150 flex-shrink-0 ${
              added ? "bg-green-600 scale-95" : "bg-gray-900"
            }`}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopRated() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.cat === activeCategory);

  return (
    <div className="md:shadow-[0px_0px_2px_0px_#0000002b] w-full rounded-xl md:m-2.5 p-5">
      <NavBar />
      <div className="max-w-5xl mx-auto py-10 px-8 mt-8">
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600&display=swap"
          rel="stylesheet"
        />

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-1">
              {t("Customer Favourites")}
            </p>
            <h2
              className="text-3xl font-semibold text-gray-900 leading-tight m-0"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("Top Rated Products")}
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {[
            { label: "Products reviewed", value: "2,841" },
            { label: "Avg. rating", value: "4.7 ★" },
            { label: "Verified buyers", value: "98%" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-gray-100 rounded-lg p-3 text-center"
            >
              <p className="text-xs text-gray-700 mb-0.5">{t(s.label)}</p>
              <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
