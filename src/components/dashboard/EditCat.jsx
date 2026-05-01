import { CAT, CATAEDIT } from "@/Api/Api";
import { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Axios } from "@/Api/Axios";
import { Rander } from "./context/RanderContext";

export default function EditCat() {
  const pathID = useParams().id;
  const [title, setTitle] = useState("");
  const { rander, rerander } = useContext(Rander);
  const [image, setImage] = useState(null);
  const nav = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    Axios.get(`${CATAEDIT}/${pathID}`)
      .then((res) => {
        setTitle(res.data.title);
      })
      .catch(() => {
        nav("/dashboard/categories/page/404", { replace: true });
      });
  }, [nav, pathID]);

  async function UpdateUser(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    if (image) {
      form.append("image", image);
    }

    try {
      await Axios.post(`${CATAEDIT}/edit/${pathID}`, form);
      rerander((prev) => !prev);
      nav("/dashboard/categories");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 backdrop-blur-sm px-4 py-8">
      <Card className="w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">{t("Edit Category")}</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              {t(
                "Update the category details and upload a new image if needed.",
              )}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={() => nav("/dashboard/categories")}
          >
            <MdClose className="h-5 w-5" />
          </Button>
        </div>

        <CardContent className="px-6 py-6">
          <form className="grid gap-6" onSubmit={UpdateUser}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category-title">{t("Title")}</Label>
                <Input
                  id="category-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder={t("Title")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-image">{t("Image")}</Label>
                <input
                  id="category-image"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  type="file"
                  accept="image/*"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={title.length <= 0}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/20 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("Save Changes")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
