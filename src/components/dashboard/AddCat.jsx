import { CAT, CATADD } from "@/Api/Api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Loading from "@/pages/Loading";
import { MdClose } from "react-icons/md";
import { Axios } from "@/Api/Axios";
import { useTranslation } from "react-i18next";

export default function AddCat() {
  //startes
  const foucus = useRef("");
  const [title, setTitle] = useState("");
  const [image, setimage] = useState(null);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  const { t } = useTranslation();
  //startes

  //effect
  useEffect(() => {
    foucus.current.focus();
  }, []);
  //effect

  //function
  async function AddCat(e) {
    setLoad(true);
    e.preventDefault();
    const form = new FormData();
    form.append(`title`, title);
    form.append(`image`, image);
    try {
      await Axios.post(`${CATADD}/add`, form).then((res) => {
        console.log(res);
        setLoad(false);
        window.location.pathname = "/dashboard/categories";
      });
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }
  //function

  return (
    <div className=" absolute top-0 left-0 w-full h-screen bg-[#00000047] flex justify-center items-center">
      <form
        className=" relative mt-7 mb-2 w-100 mx-auto bg-white p-6 rounded-md"
        onSubmit={AddCat}
      >
        <h4 className="block text-xl font-medium text-black">
          {t("Add Categoris")}
        </h4>
        <p className="text-slate-500 font-light">
          {t("Add the Categories here. Click save when you're done.")}
        </p>
        <MdClose
          className="ml-auto absolute top-2.5 right-2.5 text-gray-700 hover:text-black cursor-pointer"
          onClick={() => {
            nav("/dashboard/categories");
          }}
        />
        <div className="mb-1 flex flex-col gap-4 mt-10">
          <div className="w-full max-w-sm min-w-50">
            <input
              ref={foucus}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 placeholder:absolute placeholder:left-0 focus:placeholder:text-transparent text-slate-700 text-sm border-b border-slate-200  px-3 py-2 transition placeholder:duration-500 ease outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="w-full max-w-sm min-w-50">
            <input
              type="file"
              required
              className="w-full bg-transparent placeholder:text-slate-400 placeholder:absolute placeholder:left-0 focus:placeholder:text-transparent text-slate-700 text-sm border-b border-slate-200 px-3 py-2  transition placeholder:duration-500 ease outline-none"
              placeholder="Image"
              onChange={(e) => {
                setimage(e.target.files.item(0));
              }}
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Button
            className="mt-4 w-30 cursor-pointer
            rounded-md ml-auto bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-800 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={title.length <= 0 || image === null}
          >
            Save Changes
          </Button>
        </div>
      </form>
      {load && <Loading />}
    </div>
  );
}
