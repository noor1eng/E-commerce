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
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { CAT, PRODUCT, PRODUCTS } from "@/Api/Api";
import { Axios } from "@/Api/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/Loading";
import { MdOutlineCancel } from "react-icons/md";

export default function AddPro() {
  //states
  const [FormDataa, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "0",
    About: "",
    Stock: "0",
  });
  const fakedata = {
    category: null,
    title: "dummy",
    description: "des",
    price: 222,
    discount: 0,
    About: "About",
    Stock: "0",
  };
  const [id, setID] = useState("");
  const [load, setLoad] = useState(false);
  const [images, setImages] = useState([]);
  const [imageId, setImgId] = useState([]);
  const [categories, setCat] = useState([]);
  const [upload, setUpload] = useState([]);
  const foucus = useRef("");
  const openImage = useRef(false);
  const nav = useNavigate();
  //states

  // show categories in select
  const showcat = categories.map((cat, index) => {
    return (
      <SelectItem key={index} value={String(cat.id)}>
        {cat.title}
      </SelectItem>
    );
  });
  //show categories in select

  //show images after add

  //effect
  useEffect(() => {
    foucus.current.focus();
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
  //effect

  //func
  async function handleProductEdit(e) {
    try {
      setLoad(true);
      e.preventDefault();
      await Axios.post(`/${PRODUCT}/edit/${id}`, FormDataa).then((res) => {
        console.log(res);
        setLoad(false);
        nav("/dashboard/product");
      });
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }
  //func
  async function handleSubmitForm() {
    try {
      await Axios.post(`${PRODUCT}/add`, fakedata).then((res) => {
        setID(res.data.id);
      });
    } catch (err) {
      console.log(err);
    }
  }
  //fucn
  function handleopenSelectImage() {
    openImage.current.click();
  }
  //fucn
  //fucn
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
  //fucn

  // func
  async function handledeletimage(ide, imgNow) {
    try {
      await Axios.delete(`product-img/${ide}`).then((res) => {
        setImgId((prev) => prev.filter((id) => id !== ide));
        setImages((prev) =>
          prev.filter((img) => {
            return img !== imgNow;
          }),
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  // func

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleProductEdit}>
          {/* Category Select */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={FormDataa.category}
              onValueChange={(value) => {
                setFormData({ ...FormDataa, category: value });
                handleSubmitForm();
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
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                disabled={FormDataa.category === ""}
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
              <Label htmlFor="sku">About</Label>
              <Input
                disabled={FormDataa.category === ""}
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              disabled={FormDataa.category === ""}
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
              <Label>Base Price</Label>
              <Input
                disabled={FormDataa.category === ""}
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
              <Label>Discount (%)</Label>
              <Input
                disabled={FormDataa.category === ""}
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
              <Label>Stock</Label>
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
            <Label>Product Images</Label>

            <div
              className="border-2 border-dashed rounded-lg p-6 text-center"
              onClick={handleopenSelectImage}
            >
              <p className="text-sm text-muted-foreground mt-2 mb-5">
                <MdOutlineAddPhotoAlternate className="mx-auto mb-4 cursor-pointer text-[30px]" />
                Upload one or more product images
              </p>
              <Input
                disabled={FormDataa.category === ""}
                ref={openImage}
                multiple
                accept="image/*"
                type="file"
                className="cursor-pointer w-[200px] mx-auto text-center text-sm hidden"
                onChange={handleimagesend}
              />
            </div>
            {/* edit image and send before add product */}
            {images.length > 0 && (
              <div className="flex flex-col gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative flex gap-2 items-center">
                    <div className=" relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <MdOutlineCancel
                        className=" absolute top-[-5px] right-[-5px] text-black cursor-pointer rounded-lg text-[18px] bg-white"
                        onClick={() => {
                          handledeletimage(imageId[index], img);
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
                        <Progress
                          value={upload[index] || 0}
                          id="progress-upload"
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* edit image and send before add product */}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </CardContent>
      {load && <Loading />}
    </Card>
  );
}
