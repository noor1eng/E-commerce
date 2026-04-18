import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Package,
  Shield,
  CreditCard,
  Store,
  MoveRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSonner } from "@/hooks/use-sonner";
import { useTranslation } from "react-i18next";

export default function ShoppingCart() {
  const [proCart, setPro] = useState([]);
  const showToast = useSonner();
  const { t } = useTranslation();

  useEffect(() => {
    const pro = JSON.parse(localStorage.getItem("product")) || [];
    const normalized = pro.map((item) => ({
      ...item,
      quantity: item.quantity ?? 1,
    }));
    setPro(normalized);
    localStorage.setItem("product", JSON.stringify(normalized));
  }, []);

  const itemNumber = proCart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const subtotal = proCart.reduce(
    (total, item) => total + (Number(item.price) || 0) * (item.quantity || 1),
    0,
  );

  const updateQuantity = (id, increase) => {
    setPro((current) => {
      const next = current.map((item) => {
        if (item.id !== id) return item;
        const nextQuantity = (item.quantity || 1) + (increase ? 1 : -1);
        return {
          ...item,
          quantity: Math.max(nextQuantity, 1),
        };
      });
      localStorage.setItem("product", JSON.stringify(next));
      return next;
    });
  };

  const removeItem = (id) => {
    setPro((current) => {
      const next = current.filter((item) => item.id !== id);
      localStorage.setItem("product", JSON.stringify(next));
      return next;
    });
  };

  const showProduct = proCart.map((cart) => {
    return (
      <Card key={cart.id} className={cn("gap-0 overflow-hidden py-0", {})}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-auto w-full sm:w-40">
            <img
              src={cart.images[0]?.image || "/placeholder.png"}
              alt={cart.title}
              className="h-36 w-full object-cover object-center"
            />
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-foreground text-lg font-medium">
                  {cart.title}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {t("Black size one")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                onClick={() => removeItem(cart.id)}
              >
                <Trash2 />
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 cursor-pointer"
                  onClick={() => updateQuantity(cart.id, false)}
                  disabled={cart.quantity <= 1}
                >
                  <Minus />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {cart.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 cursor-pointer"
                  onClick={() => updateQuantity(cart.id, true)}
                >
                  <Plus />
                </Button>
              </div>

              <div className="text-end">
                <p className="text-lg font-semibold">
                  $
                  {((Number(cart.price) || 0) * (cart.quantity || 1)).toFixed(
                    2,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="bg-muted/20 border-t px-4 !py-2">
          <div className="text-muted-foreground flex items-center text-sm">
            <Package className="me-2 size-4" />
            <span>{t("Estimated delivery: 3-5 business days")}</span>
          </div>
        </CardFooter>
      </Card>
    );
  });

  return (
    <>
      <NavBar />
      <div className="md:shadow-[0px_0px_2px_0px_#0000006b] rounded-xl md:m-1.5">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-20">
          <div className="flex flex-col gap-2 mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("Your Shopping Cart")}
            </h1>
            <p className="text-muted-foreground">
              {`${itemNumber} ${itemNumber === 1 ? t("item") : t("items")}`} {t("in your cart")}
              •{" "}
              <span className="text-foreground font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 flex flex-col gap-6">
              {/* Cart Items */}
              {proCart.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag className="text-muted-foreground/50 mb-4 size-12" />
                    <h3 className="text-lg font-medium">{t("Your cart is empty")}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {t("Add some items to get started")}
                    </p>
                    <Link to={"/ProductWeb"}>
                      <Button
                        className="h-9 px-4 py-2 mt-4 cursor-pointer"
                        variant="outline"
                      >
                        {t("Continue Shopping")}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                showProduct
              )}
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-4 w-full lg:w-96">
              <Card className=" gap-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{t("Order Summary")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("Subtotal")}</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("Shipping")}</span>
                      <span className="text-success">{t("Free")}</span>
                    </div>
                    {/* {savings > 0 && (
                  <div className="flex justify-between text-sm font-medium">
                  <span>You Save</span> */}
                    {/* <span>-${savings.toFixed(2)}</span> */}
                    {/* </div> */}
                    {/* )} */}
                  </div>

                  <Separator className="my-2" />

                  <div className="flex items-center justify-between text-base font-medium">
                    <span>{t("Total")}</span>
                    <div className="text-end">
                      <p className="text-xl font-bold">
                        ${subtotal.toFixed(2)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {t("including VAT, if applicable")}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => showToast(t("Proceeding Done"))}
                    size="lg"
                    className="h-10 px-8 mt-4 w-full cursor-pointer text-base font-medium"
                    // disabled={items.length === 0}
                  >
                    <ShoppingBag />
                    {t("Proceed to Checkout")}
                  </Button>

                  <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                    <CreditCard className="size-3.5" />
                    <span>{t("Secure payment with SSL encryption")}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed py-4">
                <CardContent className="px-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t("Secure Checkout")}</h4>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {t("Your payment information is encrypted and secure.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Link to={"/ProductWeb"}>
                <Button
                  variant="outline"
                  className="h-9 px-4 py-2 w-full cursor-pointer"
                >
                  <Store />
                  {t("Continue Shopping")}
                  <MoveRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
