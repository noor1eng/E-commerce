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
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());

    carouselApi.on("select", onSelect);
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    const intervalId = setInterval(() => {
      carouselApi.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [carouselApi]);

  return (
    <div className="md:shadow-[0px_0px_2px_0px_#0000006b] rounded-xl md:m-1.5 ">
      <NavBar />
      <section className="from-background to-accent/20 relative bg-linear-to-b">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:px-8 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <header className="space-y-8">
              <Badge variant="outline" className="rounded-full px-4 py-2">
                <TrendingUp className="me-1 !size-4" />
                New Collection 2025
              </Badge>

              <h1 className="text-5xl leading-tight font-bold font-sans text-balance md:text-6xl lg:text-6xl">
                Discover Your Perfect Style
              </h1>

              <p className="text-muted-foreground max-w-lg leading-[1.5] text-xl font-sans text-balance">
                Explore our curated collection of premium products. Each piece
                is handpicked for those who appreciate quality and style.
              </p>

              <div className="relative max-w-md">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="h-14 rounded-full pe-4 pl-12 text-lg"
                  aria-label="Search products"
                />
                <Search className="text-muted-foreground absolute start-4 top-1/2 size-5 -translate-y-1/2" />
                <Button
                  size="lg"
                  className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-6"
                >
                  Search
                </Button>
              </div>

              <div className="flex gap-4">
                <Link to={"/ProductWeb"}>
                  <Button
                    size="lg"
                    className="cursor-pointer gap-2 rounded-full px-8 py-3 text-lg"
                  >
                    Shop Now
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer gap-2 rounded-full px-8 py-3 text-lg"
                >
                  <ShoppingBag className="size-4" />
                  View Catalog
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
                    {featuredProducts.map((product) => {
                      return (
                        <CarouselItem key={product.id}>
                          <Card className="relative size-full overflow-hiddn py-4 text-black">
                            <CardContent className="px-4">
                              <div className="relative size-full overflow-hidden rounded-md flex ">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-[500px] w-full object-cover"
                                  loading="lazy"
                                />

                                <div className="text-background-foreground absolute inset-0 flex flex-col justify-end p-8 text-black">
                                  <div className="relative z-10 max-w-md space-y-4">
                                    <Badge className="w-fit rounded-full">
                                      {product.tag}
                                    </Badge>
                                    <h2 className="text-5xl font-bold">
                                      {product.name}
                                    </h2>
                                    <p className="text-background-foreground/80 text-xl">
                                      Discover the latest in style and comfort
                                      with our premium collection.
                                    </p>
                                    <div className="flex items-center gap-4 pt-2">
                                      <Button
                                        size="lg"
                                        className="cursor-pointer rounded-full"
                                      >
                                        Shop Now
                                      </Button>
                                      <div className="text-foreground flex items-center gap-1">
                                        <Star className="fill-foreground size-5 " />
                                        <span className="font-medium">
                                          {product.rating}
                                        </span>
                                        <span className="text-foreground/80">
                                          ({product.reviews} reviews)
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {product.trending && (
                                  <div className="text-background-foreground bg-foreground/10 dark:bg-background/20 absolute end-8 top-8 flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-xs">
                                    <Flame className="size-4" /> Trending
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
                <div className="relative mt-8 flex justify-center gap-3">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      className={`relative size-2.5 rounded-full transition-all ${activeIndex === index ? "bg-foreground" : "bg-foreground/50"}`}
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => {
                        setActiveIndex(index);
                        carouselApi?.scrollTo(index);
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
