import NavBar from "../NavBar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star, Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Axios } from "@/Api/Axios";
import { PRODUCT } from "@/Api/Api";
import { useSonner } from "@/hooks/use-sonner";

export default function ProductShop() {
  const pathID = useParams().id; //get product id
  const [productDetails, setProductDetails] = useState("");
  const [image, setImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [Stock, setStock] = useState();
  const showToast = useSonner();

  console.log(Stock);

  useEffect(() => {
    try {
      Axios.get(`${PRODUCT}/${pathID}`).then((res) => {
        setProductDetails(res.data[0]);
        setImage(res.data[0].images);
        setStock(res.data[0].stock);
      });
    } catch (err) {
      console.log(err);
    }
  }, [pathID]);

  const color = [
    { color: "#FFFFFF" },
    { color: "#000000" },
    { color: "#808080" },
  ];

  // handle save to localStorage with quantity
  function handleSave() {
    const cart = JSON.parse(localStorage.getItem("product")) || [];
    const existingIndex = cart.findIndex(
      (item) => String(item.id) === String(productDetails.id),
    );
    const productToSave = { ...productDetails, quantity };

    if (existingIndex >= 0) {
      cart[existingIndex] = {
        ...cart[existingIndex],
        quantity: (cart[existingIndex].quantity || 1) + quantity,
      };
    } else {
      cart.push(productToSave);
    }

    localStorage.setItem("product", JSON.stringify(cart));
    showToast("Product Adding");
  }

  return (
    <>
      <NavBar />
      <div className="md:shadow-[0px_0px_2px_0px_#0000006b] rounded-xl md:m-1.5">
        {/* Product Details */}
        <section className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-2 lg:gap-8 lg:py-6 xl:grid-cols-3 xl:gap-12 xl:py-12">
            {/* Product Info */}
            <div className="flex flex-col justify-between gap-6 lg:gap-8">
              <div className="flex flex-col gap-2 lg:gap-4">
                <span className="text-sm font-semibold tracking-wide uppercase">
                  {productDetails.category}
                </span>
                <h2 className="text-xl font-bold tracking-tight text-balance lg:text-3xl">
                  {productDetails.title}
                </h2>
                <p className="text-muted-foreground text-balance">
                  {productDetails.description}
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  ${productDetails.price - productDetails.discount}
                </p>
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap gap-4">
                {image &&
                  image.map((img, index) => (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`ring-offset-background size-16 cursor-pointer overflow-hidden rounded-sm ring-offset-2 transition-all lg:size-18 ${
                        selectedImageIndex === index
                          ? "ring-2 ring-primary"
                          : "ring-1 ring-gray-300 hover:ring-gray-400"
                      }`}
                    >
                      <img
                        src={img.image}
                        alt={img.alt}
                        className="size-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="row-span-2 row-start-1 lg:col-start-2">
              {image && image.length > 0 && (
                <img
                  src={image[selectedImageIndex].image}
                  alt={image[selectedImageIndex].alt}
                  className="w-full h-[450px] rounded-lg object-cover transition-all duration-300"
                />
              )}
            </div>

            {/* Product Attributes */}
            <div className="flex flex-col gap-6 lg:gap-10">
              {/* Color Selection */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Color</h3>
                <div className="flex gap-3">
                  {color.map((col, index) => (
                    <Button
                      key={index}
                      style={{ backgroundColor: col.color }}
                      className="w-9 h-9 cursor-pointer rounded-full p-0 ring-black ring-offset-2 transition-all hover:ring-2 focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-primary"
                    />
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Reviews</h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-foreground size-5"
                      fill={productDetails.rating > 0 ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">Order</h3>
                <div className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 cursor-pointer"
                    onClick={() => setQuantity((prev) => prev - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 cursor-pointer"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="h-10 px-8 flex-1 cursor-pointer rounded-full"
                  size="lg"
                >
                  Add to Cart
                </Button>
                {/* <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full cursor-pointer"
                >
                  <Heart
                  // className=
                  //   "size-5",
                  // isWishlisted && "fill-primary text-primary",
                  />
                </Button> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
