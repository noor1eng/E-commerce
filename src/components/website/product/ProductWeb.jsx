import { Star, ShoppingCart, Search, Filter } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/website/NavBar";
import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "@/Api/Axios";
import Skel from "@/pages/website/Skel";
import { PRODUCTS } from "@/Api/Api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { useSonner } from "@/hooks/use-sonner";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductWeb() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [page, limit]);

  useEffect(() => {
    Axios.get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function hanleChangepage() {
    setPage((prev) => prev + 1);
  }
  function hanldePrevPage() {
    setPage((prev) => prev - 1);
  }
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("product")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    const productToSave = { ...product, quantity: 1 };

    if (existingIndex >= 0) {
      cart[existingIndex] = {
        ...cart[existingIndex],
        quantity: (cart[existingIndex].quantity || 1) + 1,
      };
    } else {
      cart.push(productToSave);
    }

    localStorage.setItem("product", JSON.stringify(cart));
  }

  const showProducts = products.map((pro) => {
    return pro.images.length > 0 ? (
      <Card
        key={pro.id}
        className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden bg-gray-50">
            <img
              src={pro.images[0]?.image || "/placeholder.png"}
              alt={pro.title}
              className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {pro.discount > 0 && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                -${pro.discount}
              </Badge>
            )}

            <button
              className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-primary hover:text-white"
              onClick={() => {
                addToCart(pro);
                showToast(t("Adding to Cart"));
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <Badge variant="outline" className="text-xs">
                {pro.category}
              </Badge>

              <CardTitle className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {pro.title}
              </CardTitle>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < (pro.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">
                ({pro.rating || 0})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${pro.price - pro.discount}
                </span>
                {pro.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${pro.price}
                  </span>
                )}
              </div>
              <Link to={`/productShop/${pro.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all hover:bg-primary hover:text-white"
                >
                  {t("View")}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    ) : null;
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <section className="container mx-auto max-w-7xl px-4 py-8 mt-20">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("Popular Products")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "This beloved product has become a favorite among our customers for its exceptional features and unparalleled performance",
            )}
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t("Search products...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={t("All Categories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>{t("All Categories")}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.length > 0
            ? showProducts
            : loading &&
              Array.from({ length: 8 }).map((_, i) => <Skel key={i} />)}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={page > 1 ? hanldePrevPage : undefined}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={page < totalPages ? hanleChangepage : undefined}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </div>
  );
}
