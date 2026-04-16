import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { CAT } from "@/Api/Api";
import { Link } from "react-router-dom";
import NavBar from "@/components/website/NavBar";
import Skel from "@/pages/website/Skel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CategorieWeb() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [total, setTotal] = useState();
  const totalPages = Math.ceil(total / limit);
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCategories(res.data.data);
        setTotal(res.data.total);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, limit]);

  function hanleChangepage() {
    setPage((prev) => prev + 1);
  }
  function hanldePrevPage() {
    setPage((prev) => prev - 1);
  }

  const showCat = categories.map((cat) => {
    return (
      <Card
        key={cat.id}
        className="group cursor-pointer overflow-hidden py-0 transition-all duration-500 hover:shadow-lg"
      >
        <div className="relative aspect-[5/4] overflow-hidden">
          <img
            src={cat.image}
            alt={"image"}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Trending Badge */}
          {cat.trending && (
            <Badge className="absolute top-4 left-4">Trending</Badge>
          )}

          {/* Category Info Overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-6 text-white font-sans ">
            <h3 className="mb-1 text-xl font-bold text-white/80">
              {cat.title}
            </h3>
            <p className="mb-3 text-sm text-white/80">
              Laptops, phones, and gadgets
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm">2,156 items</span>
            </div>
          </div>
        </div>
      </Card>
    );
  });
  return (
    <>
      <NavBar />
      <div className="md:shadow-[0px_0px_2px_0px_#0000003b] rounded-xl md:m-1.5 ">
        <section className="py-12 mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-balance">
                Shop by Category
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Discover products across our most popular categories
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.length > 0 ? showCat : loading && <Skel />}
            </div>
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
              {/* pages number */}
              {Array.from({ length: Math.min(totalPages, 5) }).map(
                (num, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={page === index + 1}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                    {/* pages number */}
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
          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link to={"/"}>
              <Button size="lg" className="cursor-pointer gap-2">
                <ShoppingBag className="size-5" />
                Back to Shopping
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
