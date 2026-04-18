import NavBar from "../NavBar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star, Minus, Plus, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Axios } from "@/Api/Axios";
import { PRODUCT } from "@/Api/Api";
import { useSonner } from "@/hooks/use-sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function ProductShop() {
  const pathID = useParams().id; //get product id
  const [productDetails, setProductDetails] = useState("");
  const [image, setImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [Stock, setStock] = useState();
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://github.com/shadcn.png",
      comment: "Great product! Highly recommend.",
      rating: 5,
      date: "2023-10-01",
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://github.com/vercel.png",
      comment: "Good quality, but delivery was slow.",
      rating: 4,
      date: "2023-09-28",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const showToast = useSonner();
  const { t } = useTranslation();

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
    showToast(t("Product Adding"));
  }

  // handle add comment
  function handleAddComment() {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "You",
        avatar: "https://github.com/shadcn.png",
        comment: newComment,
        rating: newRating,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setNewRating(5);
      showToast(t("Comment added!"));
    }
  }

  return (
    <>
      <NavBar />
      <div className="md:shadow-[0px_0px_2px_0px_#0000006b] rounded-xl md:m-1.5 p-2">
        {/* Product Details */}
        <section className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  {image && image.length > 0 && (
                    <img
                      src={image[selectedImageIndex].image}
                      alt={image[selectedImageIndex].alt}
                      className="w-full h-[500px] object-cover rounded-lg"
                    />
                  )}
                </CardContent>
              </Card>
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {image &&
                  image.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img.image}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {productDetails.category}
                  </Badge>
                  <CardTitle className="text-3xl">
                    {productDetails.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < (productDetails.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({productDetails.rating || 0})
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {productDetails.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">
                      ${productDetails.price - productDetails.discount}
                    </span>
                    {productDetails.discount > 0 && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${productDetails.price}
                      </span>
                    )}
                  </div>

                  {/* Color Selection */}
                  <div>
                    <h3 className="font-semibold mb-2">{t("Color")}</h3>
                    <div className="flex gap-2">
                      {color.map((col, index) => (
                        <button
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all"
                          style={{ backgroundColor: col.color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="font-semibold mb-2">{t("Quantity")}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleSave} className="flex-1" size="lg">
                      {t("Add to Cart")}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comments Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="size-5" />
                {t("Reviews")} ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-4">
                <h4 className="font-semibold">{t("Add a Review")}</h4>
                <div className="flex gap-2">
                  <span className="text-sm font-medium">{t("Rating")}:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewRating(i + 1)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`size-5 ${
                            i < newRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder={t("Write your review...")}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleAddComment}>{t("Submit Review")}</Button>
              </div>

              <Separator />

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>
                        {comment.user.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-4 ${
                                  i < comment.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
