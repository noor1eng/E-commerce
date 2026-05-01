//import
import {
  Card,
  CardContent,
  CardHeader,
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
import { CAT, PRODUCT } from "@/Api/Api";
import { Axios } from "@/Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/pages/Loading";
import { MdOutlineAddPhotoAlternate, MdOutlineCancel } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Rander } from "./context/RanderContext";
//import

export default function EditProduct() {
  const [FormDataa, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "0",
    About: "",
    Stock: "0",
  });

  const [load, setLoad] = useState(false);
  const [id, setID] = useState("");
  const [categories, setCat] = useState([]);
  const [imageId, setImgId] = useState([]);
  const { rander, rerander } = useContext(Rander);
  const [upload, setUpload] = useState([]);
  const focus = useRef(null);
  const [idfromserver, setidformserver] = useState([]);
  const openImage = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesFromApi, setImagesFromApi] = useState([]);
  const { t } = useTranslation();
  const nav = useNavigate();
  const pathID = useParams().id;

  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${PRODUCT}/${pathID}`)
      .then((res) => {
        const product = res.data?.[0];
        if (!product) {
          nav("/dashboard/product/page/404", { replace: true });
          return;
        }
        setID(product.id);
        setFormData(product);
        setImagesFromApi(product.images || []);
      })
      .catch(() => {
        nav("/dashboard/product/page/404", { replace: true });
      });
  }, [nav, pathID]);

  const showcat = categories.length
    ? categories.map((cat) => (
        <SelectItem key={cat.id} value={String(cat.id)}>
          {cat.title}
        </SelectItem>
      ))
    : [<SelectItem key="empty">{t("No categories available")}</SelectItem>];

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
          onUploadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total;
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

  async function handledeletimagefromapi(ide) {
    setidformserver((prev) => [...prev, ide]);
    setImagesFromApi((prev) => prev.filter((img) => img.id !== ide));
  }

  async function handledeletimagefromstate(ide, imgnow) {
    try {
      await Axios.delete(`product-img/${ide}`);
      setImages((prev) => prev.filter((img) => img !== imgnow));
    } catch (err) {
      console.log(err);
    }
  }

  const imageformapi = imagesFromApi.map((img, index) => (
    <div
      key={img.id || index}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"
    >
      <img
        src={img.image}
        alt={`Preview ${index + 1}`}
        className="h-28 w-28 object-cover"
      />
      <button
        type="button"
        className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm"
        onClick={() => handledeletimagefromapi(img.id)}
      >
        <MdOutlineCancel className="h-5 w-5 text-slate-700" />
      </button>
    </div>
  ));

  const imageformstate = images.map((img, index) => (
    <div
      key={index}
      className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
    >
      <div className="relative h-28 w-28 overflow-hidden rounded-3xl bg-slate-100">
        <img
          src={URL.createObjectURL(img)}
          alt={`Preview ${index + 1}`}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm"
          onClick={() => handledeletimagefromstate(imageId[index], img)}
        >
          <MdOutlineCancel className="h-5 w-5 text-slate-700" />
        </button>
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm text-slate-600">
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
    </div>
  ));

  async function handleEditPro(e) {
    e.preventDefault();
    setLoad(true);
    try {
      for (const imgId of idfromserver) {
        await Axios.delete(`/product-img/${imgId}`);
      }
      await Axios.post(`${PRODUCT}/edit/${pathID}`, FormDataa);
      nav("/dashboard/product");
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 px-6 py-6">
        <CardTitle>{t("Edit Your Product")}</CardTitle>
        <CardDescription>
          {t("Update product details, pricing and images from one view.")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-6 py-6">
        <form className="space-y-6" onSubmit={handleEditPro}>
          <div className="space-y-3">
            <Label htmlFor="category">{t("Category")}</Label>
            <Select
              value={FormDataa.category}
              onValueChange={(value) =>
                setFormData({ ...FormDataa, category: value })
              }
            >
              <SelectTrigger className="mt-1 w-full" ref={focus}>
                <SelectValue placeholder={t("Select a category")} />
              </SelectTrigger>
              <SelectContent>{showcat}</SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="title">{t("Title")}</Label>
              <Input
                id="title"
                className="mt-1"
                placeholder={t("Product Name")}
                value={FormDataa.title}
                onChange={(e) =>
                  setFormData({ ...FormDataa, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="about">{t("About")}</Label>
              <Input
                id="about"
                className="mt-1"
                placeholder={t("Short summary")}
                value={FormDataa.About}
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
              className="mt-1"
              placeholder={t("Product Description")}
              value={FormDataa.description}
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
                className="mt-1"
                step="10"
                placeholder="0"
                value={FormDataa.price}
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
                className="mt-1"
                placeholder={t("Optional")}
                value={FormDataa.discount}
                onChange={(e) =>
                  setFormData({ ...FormDataa, discount: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="stock">{t("Stock")}</Label>
              <Input
                id="stock"
                disabled={FormDataa.category === ""}
                type="number"
                className="mt-1"
                placeholder={t("Optional")}
                value={FormDataa.Stock}
                onChange={(e) =>
                  setFormData({ ...FormDataa, Stock: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-3">
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

          {imagesFromApi.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {imageformapi}
            </div>
          )}
          {images.length > 0 && (
            <div className="space-y-4">{imageformstate}</div>
          )}

          <Button
            type="submit"
            className="w-full rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/20 hover:bg-slate-900"
          >
            {t("Save Product")}
          </Button>
        </form>
      </CardContent>
      {load && <Loading />}
    </Card>
  );
}
