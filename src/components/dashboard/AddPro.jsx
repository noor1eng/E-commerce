import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate, MdOutlineCancel } from "react-icons/md";
import { CAT, PRODUCT } from "@/Api/Api";
import { Axios } from "@/Api/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/Loading";
import { useTranslation } from "react-i18next";
import { Rander } from "./context/RanderContext";

export default function AddPro() {
  const [FormDataa, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "0",
    discount: "0",
    About: "",
    stock: "0",
  });
  const [id, setID] = useState("");
  const [load, setLoad] = useState(false);
  const [images, setImages] = useState([]);
  const { rander, rerander } = useContext(Rander);
  const [imageId, setImgId] = useState([]);
  const [categories, setCat] = useState([]);
  const [upload, setUpload] = useState([]);
  const focus = useRef(null);
  const openImage = useRef(null);
  const nav = useNavigate();
  const { t } = useTranslation();

  const showcat = categories.map((cat) => (
    <SelectItem key={cat.id} value={String(cat.id)}>
      {cat.title}
    </SelectItem>
  ));

  console.log(id);

  useEffect(() => {
    focus.current?.focus();
  }, []);

  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleProductEdit(e) {
    e.preventDefault();
    setLoad(true);

    try {
      await Axios.post(`${PRODUCT}/edit/${id}`, FormDataa);
      nav("/dashboard/product");
      rerander((prev) => !prev);
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }

  async function handleSubmitForm() {
    try {
      const { data } = await Axios.post(`${PRODUCT}/add`, {
        category: FormDataa.category,
        title: FormDataa.title || "New Product",
        description: FormDataa.description || "sdf",
        price: FormDataa.price || 0,
        discount: FormDataa.discount || 0,
        About: FormDataa.About || "safd",
        stock: FormDataa.stock,
      });
      setID(data.id);
    } catch (err) {
      console.log(err);
    }
  }

  function handleopenSelectImage() {
    openImage.current?.click();
  }

  async function handleimagesend(e) {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    const startIndex = images.length;

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("image", files[i]);
      data.append("product_id", id);
      try {
        await Axios.post("/product-img/add", data, {
          onUploadProgress: (progresEvent) => {
            const loaded = progresEvent.loaded;
            const total = progresEvent.total;
            const percent = Math.floor((loaded * 100) / total);
            setUpload((prev) => {
              const copy = [...prev];
              copy[startIndex + i] = percent;
              return copy;
            });
          },
        }).then((res) => {
          setImgId((prev) => [...prev, res.data.id]);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handledeletimage(ide, imgNow) {
    try {
      await Axios.delete(`product-img/${ide}`);
      setImgId((prev) => prev.filter((item) => item !== ide));
      setImages((prev) => prev.filter((img) => img !== imgNow));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <Card className="w-full">
        <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("Add New Product")}</CardTitle>
            <CardDescription>
              {t(
                "Fill the product details and upload images to create a new product.",
              )}
            </CardDescription>
          </div>
        </div>

        <CardContent className="space-y-6 px-6 py-6">
          <form className="space-y-6" onSubmit={handleProductEdit}>
            <div className="space-y-3">
              <Label htmlFor="category">{t("Category")}</Label>
              <Select
                value={FormDataa.category}
                onValueChange={(value) => {
                  setFormData({ ...FormDataa, category: value });
                  handleSubmitForm();
                }}
              >
                <SelectTrigger className="mt-1 w-full" ref={focus}>
                  <SelectValue placeholder={t("Select a category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem>{t("Select a category")}</SelectItem>
                  {showcat}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="title">{t("Title")}</Label>
                <Input
                  id="title"
                  value={FormDataa.title}
                  disabled={FormDataa.category === ""}
                  placeholder={t("Product Name")}
                  onChange={(e) =>
                    setFormData({ ...FormDataa, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="about">{t("About")}</Label>
                <Input
                  id="about"
                  value={FormDataa.About}
                  disabled={FormDataa.category === ""}
                  placeholder={t("Short summary")}
                  onChange={(e) =>
                    setFormData({ ...FormDataa, About: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description">{t("Description")}</Label>
              <Textarea
                id="description"
                value={FormDataa.description}
                disabled={FormDataa.category === ""}
                placeholder={t("Product Description")}
                onChange={(e) =>
                  setFormData({ ...FormDataa, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-3">
                <Label htmlFor="price">{t("Base Price")}</Label>
                <Input
                  id="price"
                  type="number"
                  value={FormDataa.price}
                  disabled={FormDataa.category === ""}
                  placeholder="0"
                  onChange={(e) =>
                    setFormData({ ...FormDataa, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="discount">{t("Discount")} (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={FormDataa.discount}
                  disabled={FormDataa.category === ""}
                  placeholder={t("Optional")}
                  onChange={(e) =>
                    setFormData({ ...FormDataa, discount: e.target.value })
                  }
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="stock">{t("Stock")}</Label>
                <Input
                  id="stock"
                  type="number"
                  value={FormDataa.Stock}
                  disabled={FormDataa.category === ""}
                  placeholder={t("Optional")}
                  onChange={(e) =>
                    setFormData({ ...FormDataa, Stock: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>{t("Product Images")}</Label>
              <div
                className="cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400 hover:bg-slate-100"
                onClick={handleopenSelectImage}
              >
                <MdOutlineAddPhotoAlternate className="mx-auto mb-4 text-[30px] text-slate-500" />
                <p className="text-sm text-slate-500">
                  {t("Upload one or more product images")}
                </p>
              </div>
              <Input
                ref={openImage}
                multiple
                accept="image/*"
                type="file"
                className="hidden"
                onChange={handleimagesend}
              />
            </div>

            {images.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="relative mb-4 h-28 overflow-hidden rounded-3xl bg-slate-100">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm"
                        onClick={() => handledeletimage(imageId[index], img)}
                      >
                        <MdOutlineCancel className="h-5 w-5 text-slate-700" />
                      </button>
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      {(img.size * 10 ** -6).toFixed(2)} MB
                    </p>
                    <Field className="w-full">
                      <FieldLabel htmlFor={`progress-upload-${index}`}>
                        <span className="text-xs text-slate-500">
                          {t("Upload progress")}
                        </span>
                        <span className="ml-auto text-xs text-slate-500">
                          {upload[index] || 0}%
                        </span>
                      </FieldLabel>
                      <Progress
                        value={upload[index] || 0}
                        id={`progress-upload-${index}`}
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/20 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("Save Product")}
            </Button>
          </form>
        </CardContent>
      </Card>
      {load && <Loading />}
    </div>
  );
}
