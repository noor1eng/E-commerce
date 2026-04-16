import { Star, ShoppingCart } from "lucide-react";
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

export default function ProductWeb() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [total, setTotal] = useState();
  const totalPages = Math.ceil(total / limit);
  const showToast = useSonner();

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
        className="group overflow-hidden transition-all hover:shadow-lg"
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden  bg-zinc-100">
            <img
              src={pro.images[0]?.image || "/placeholder.png"}
              alt={pro.title}
              className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <button
              className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110"
              onClick={() => addToCart(pro)}
            >
              <ShoppingCart
                onClick={() => showToast("Adding to Chart")}
                className="h-5 w-5"
              />
            </button>
          </div>

          <div className="space-y-3 p-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                {pro.category} CAT
              </p>

              <CardTitle className="line-clamp-1 text-lg font-semibold text-zinc-900 transition group-hover:text-black">
                {pro.title}
              </CardTitle>
            </div>

            <div className="flex items-center gap-1 text-zinc-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${"fill-transparent text-zinc-300"}`}
                />
              ))}

              <span className="ml-1 text-sm">
                {pro.rating > 0 ? pro.rating : "N/A"}
              </span>
            </div>

            <div className="flex items-end justify-between pt-2">
              <div>
                <p className="text-sm text-zinc-400 line-through">
                  ${pro.price}
                </p>
                <p className="text-2xl font-bold text-zinc-900">
                  ${pro.price - pro.discount}
                </p>
              </div>
              <Link to={`/productShop/${pro.id}`}>
                <button className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white">
                  View
                </button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    ) : (
      ""
    );
  });
  return (
    <div className="md:shadow-[0px_0px_2px_0px_#0000003b] rounded-xl md:m-1.5">
      <NavBar />
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-8 mt-20">
        <header className="space-y-2">
          <h2 className="text-3xl font-bold text-balance sm:text-4xl mx-auto text-center">
            Popular Products
          </h2>
          <p className="text-muted-foreground max-w-[60ch] mx-auto text-lg text-center">
            This beloved product has become a favorite among our customers for
            its exceptional features and unparalleled performance
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.length > 0 ? showProducts : loading && <Skel />}
        </div>
        <Pagination className={"mt-3 mx-auto"}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={page > 1 ? hanldePrevPage : undefined}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(totalPages, 5) }).map(
              (num, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === index + 1}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                onClick={hanleChangepage}
                aria-disabled={page === totalPages}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
}
