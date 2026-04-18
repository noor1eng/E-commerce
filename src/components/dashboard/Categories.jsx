import { MdOutlinePersonAdd } from "react-icons/md";
import Table from "./Table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CAT, CATADELETE } from "@/Api/Api";
import { Axios } from "@/Api/Axios";
import { useTranslation } from "react-i18next";

export default function Catigories() {
  //states
  const [categories, setCat] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rand, rerand] = useState(false);
  const [total, setTotal] = useState();
  const { t } = useTranslation();
  //states
  // effect
  useEffect(() => {
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCat(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rand, limit, page]);
  // effect

  const header = [
    {
      key: "id",
      name: "ID",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "title",
      name: "Title",
    },
  ];
  return (
    <>
      <h1
        className="font-bold text-[25px] text-black"
        style={{ wordSpacing: "-3px" }}
      >
        {t("Categories List")}
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <p className="text-slate-400 ">
          {t("Manage your product and their roles here.")}
        </p>
        <Link to="/dashboard/categories/addCat">
          <Button
            className=" w-30 block rounded-md bg-black py-1.5 px-3 border border-transparent  text-sm text-white font-semibold transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <div className="flex items-center justify-between">
              {t("Add categorie")}
              <MdOutlinePersonAdd className="text-[16px] ml-2" />
            </div>
          </Button>
        </Link>
      </div>
      <Table
        header={header}
        data={categories}
        deletee={CATADELETE}
        rerand={rerand}
        limit={limit}
        page={page}
        setPage={setPage}
        add="categories"
        total={total}
      />
    </>
  );
}
