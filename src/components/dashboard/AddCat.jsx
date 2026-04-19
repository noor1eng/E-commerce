import { CAT, CATADD } from "@/Api/Api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import Loading from "@/pages/Loading";
import { MdClose } from "react-icons/md";
import { Axios } from "@/Api/Axios";
import { useTranslation } from "react-i18next";

export default function AddCat() {
  const focus = useRef(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    focus.current?.focus();
  }, []);

  async function AddCat(e) {
    e.preventDefault();
    setLoad(true);

    const form = new FormData();
    form.append("title", title);
    if (image) {
      form.append("image", image);
    }

    try {
      await Axios.post(`${CATADD}/add`, form);
      nav("/dashboard/categories");
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4 py-8 backdrop-blur-sm">
      <Card className="w-full max-w-lg overflow-hidden shadow-2xl">
        <CardHeader className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5">
          <div>
            <CardTitle className="text-2xl">{t("Add Category")}</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              {t("Create a new category and upload a category image.")}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={() => nav("/dashboard/categories")}
          >
            <MdClose className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="px-6 py-6">
          <form className="grid gap-6" onSubmit={AddCat}>
            <div className="space-y-3">
              <Label htmlFor="category-title">{t("Title")}</Label>
              <Input
                id="category-title"
                ref={focus}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("Title")}
                type="text"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category-image">{t("Image")}</Label>
              <input
                id="category-image"
                type="file"
                accept="image/*"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={title.length <= 0 || image === null}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/20 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("Save Changes")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {load && <Loading />}
    </div>
  );
}
