import { CAT, CATAEDIT } from "@/Api/Api";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Axios } from "@/Api/Axios";
import { useTranslation } from "react-i18next";

export default function EditCat() {
  const pathID = useParams().id;

  //states
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();
  const { t } = useTranslation();
  //states

  //Effect
  useEffect(() => {
    Axios.get(`${CATAEDIT}/${pathID}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
      })
      .catch((err) => {
        nav("/dashboard/categroeis/page/404", { replace: true });
      });
  }, []);

  //Effect

  //func
  async function UpdateUser(e) {
    e.preventDefault();
    const form = new FormData();
    form.append(`title`, title);
    form.append(`image`, image);
    try {
      await Axios.post(`${CATAEDIT}/edit/${pathID}`, form).then((res) => {
        window.location.pathname = "/dashboard/categories";
      });
    } catch (err) {
      console.log(err);
    }
  }
  //func
  return (
    <div className="w-full h-[110vh] bg-[#00000047] absolute top-0 left-0 flex justify-center items-center">
      <div className="relative flex flex-col rounded-md bg-white p-5">
        <MdClose
          className="ml-auto text-gray-700 hover:text-black"
          onClick={() => {
            nav("/dashboard/categories");
          }}
        />
        <h4 className="block text-xl font-medium text-black">
          {t("Edit Category")}
        </h4>
        <p className="text-slate-500 font-light">
          {t("Update the category here. Click save when you're done.")}
        </p>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={UpdateUser}
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-black">
                {t("Title")}
              </label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={t("Title")}
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-black">
                {t("Image")}
              </label>
              <input
                onChange={(e) => {
                  setImage(e.target.files.item(0));
                }}
                type="file"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={t("Image")}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-30 block ml-auto rounded-md bg-black py-1.5 px-3 border border-transparent  text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={title.length <= 0}
          >
            {t("Save Changes")}
          </Button>
        </form>
      </div>
    </div>
  );
}
