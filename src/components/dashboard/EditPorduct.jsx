//import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect, useRef, useState } from "react";
import { CAT, PRODUCT } from "@/Api/Api";
import { Axios } from "@/Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/pages/Loading";
import { MdOutlineAddPhotoAlternate, MdOutlineCancel } from "react-icons/md";
import { useTranslation } from "react-i18next";
//import

export default function EditProduct() {
  //states-----------------
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
  const [upload, setUpload] = useState([]);
  const foucus = useRef("");
  const [idfromserver, setidformserver] = useState([]);
  const openImage = useRef(false);
  const [images, setImages] = useState([]);
  const [imagesFromApi, setImagesFromApi] = useState([]);
  const { t } = useTranslation();
  //states------------------
  const nav = useNavigate();
  const pathID = useParams().id; //get product id
  console.log(idfromserver);
  //useEffect
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //useEffect

  //useEffetct
  useEffect(() => {
    try {
      Axios.get(`${PRODUCT}/${pathID}`).then((res) => {
        console.log(res.data);

        setID(res.data[0].id);
        setFormData(res.data[0]);
        setImagesFromApi(res.data[0].images);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  //useEffetct

  // show categories in select
  const showcat = categories.map((cat, index) => {
    return (
      <SelectItem key={index} value={String(cat.id)}>
        {cat.title}
      </SelectItem>
    );
  });
  // show categories in select

  //fucn
  function handleopenSelectImage() {
    openImage.current.click();
  }
  //fucn

  //func
  async function handleimagesend(e) {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const startIndex = images.length;
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("image", files[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (progresEvent) => {
            const load = progresEvent.loaded;
            const total = progresEvent.total;
            const persent = Math.floor((load * 100) / total);
            setUpload((prev) => {
              const copy = [...prev];
              copy[startIndex + i] = persent;
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
  //func

  // func delet image come form api
  async function handledeletimagefromapi(ide) {
    setidformserver((prev) => [...prev, ide]);
    setImagesFromApi((prev) =>
      prev.filter((img) => {
        return img.id !== ide;
      }),
    );
  }
  // func delete image come form api

  // func delet image come form state
  async function handledeletimagefromstate(ide, imgnow) {
    try {
      await Axios.delete(`product-img/${ide}`).then((res) => {
        setImages((prev) =>
          prev.filter((img) => {
            return img !== imgnow;
          }),
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  // func delete image come form state

  //show image form api
  const imageformapi = imagesFromApi.map((img, index) => {
    return (
      <div key={index} className="relative">
        <div className=" relative">
          <img
            src={img.image}
            alt={`Preview ${index + 1}`}
            className="w-20 h-20 object-cover rounded"
          />
          <MdOutlineCancel
            className=" absolute top-[-5px] right-[-5px] text-black cursor-pointer rounded-lg text-[18px] bg-white"
            onClick={() => {
              handledeletimagefromapi(img.id);
            }}
          />
        </div>
      </div>
    );
  });
  //show image form api

  //show image form state
  const imageformstate = images.map((img, index) => {
    return (
      <div key={index} className=" flex gap-4">
        <div className=" relative">
          <img
            src={URL.createObjectURL(img)}
            alt={`Preview ${index + 1}`}
            className="w-20 h-20 object-cover rounded"
          />
          <MdOutlineCancel
            className=" absolute top-[-5px] right-[-5px] text-black cursor-pointer rounded-lg text-[18px] bg-white"
            onClick={() => {
              handledeletimagefromstate(imageId[index], img);
            }}
          />
        </div>
        <div className=" w-full">
          <p>{(img.size * 10 ** -6).toFixed(2)} MB</p>
          <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="progress-upload">
              <span className="text-[12px]">Upload progress</span>
              <span className="ml-auto">{upload[index] || 0}%</span>
            </FieldLabel>
            <Progress value={upload[index] || 0} id="progress-upload" />
          </Field>
        </div>
      </div>
    );
  });
  //show image form state

  //func submit edit
  async function handleEditPro(e) {
    e.preventDefault();
    try {
      for (let i = 0; i < idfromserver.length; i++) {
        await Axios.delete(`/product-img/${idfromserver[i]}`);
      }
      await Axios.post(`${PRODUCT}/edit/${pathID}`, FormDataa).then((res) => {
        window.location.pathname = "/dashboard/product";
      });
    } catch (err) {
      console.log(err);
    }
  }
  //func submit edit

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Edit Your Product")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleEditPro}>
          {/* Category Select */}
          <div>
            <Label htmlFor="category">{t("Category")}</Label>
            <Select
              value={FormDataa.category}
              onValueChange={(value) => {
                setFormData({ ...FormDataa, category: value });
                // handleSubmitForm();
              }}
            >
              ,
              <SelectTrigger className=" mt-1" ref={foucus}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>{showcat}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* title */}
            <div>
              <Label htmlFor="name">{t("Title")}</Label>
              <Input
                id="name"
                className="mt-1"
                placeholder="Product Name"
                value={FormDataa.title}
                onChange={(e) =>
                  setFormData({ ...FormDataa, title: e.target.value })
                }
              />
            </div>
            {/* title */}

            {/* about */}
            <div>
              <Label htmlFor="sku">{t("About")}</Label>
              <Input
                id="sku"
                className="mt-1"
                placeholder="About the product"
                value={FormDataa.About}
                onChange={(e) =>
                  setFormData({ ...FormDataa, About: e.target.value })
                }
              />
            </div>
            {/* about */}
          </div>

          {/* text area */}
          <div>
            <Label htmlFor="description">{t("Description")}</Label>
            <Textarea
              id="description"
              className="mt-1"
              placeholder="Product Description"
              value={FormDataa.description}
              onChange={(e) =>
                setFormData({ ...FormDataa, description: e.target.value })
              }
            />
          </div>

          {/* ===== Pricing Section ===== */}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>{t("Base Price")}</Label>
              <Input
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

            <div>
              <Label>{t("Discount")} (%)</Label>
              <Input
                type="number"
                className="mt-1"
                placeholder="Optional"
                value={FormDataa.discount}
                onChange={(e) =>
                  setFormData({ ...FormDataa, discount: e.target.value })
                }
              />
            </div>

            <div>
              <Label>{t("Stock")}</Label>
              <Input
                disabled={FormDataa.category === ""}
                type="number"
                className="mt-1"
                placeholder="Optional"
                value={FormDataa.Stock}
                onChange={(e) =>
                  setFormData({ ...FormDataa, Stock: e.target.value })
                }
              />
            </div>
          </div>
          {/* ===== Images Upload ===== */}
          <div className="space-y-3">
            <Label>{t("Product Images")}</Label>

            <div
              className="border-2 border-dashed rounded-lg p-6 text-center"
              onClick={handleopenSelectImage}
            >
              <p className="text-sm text-muted-foreground mt-2 mb-5">
                <MdOutlineAddPhotoAlternate className="mx-auto mb-4 cursor-pointer text-[30px]" />
                {t("Upload one or more product images")}
              </p>
              <Input
                ref={openImage}
                multiple
                accept="image/*"
                type="file"
                className="cursor-pointer w-[200px] mx-auto text-center text-sm hidden"
                onChange={handleimagesend}
              />
            </div>
            {/* edit image and send before add product form api */}
            {imagesFromApi.length > 0 && (
              <div className="flex flex-wrap gap-4">{imageformapi}</div>
            )}
            {images.length > 0 && <>{imageformstate}</>}
          </div>
          {/* edit image and send before add product from api */}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {t("Save Product")}
          </Button>
        </form>
      </CardContent>
      {load && <Loading />}
    </Card>
  );
}
