import { MdOutlinePersonAdd } from "react-icons/md";
import Table from "./Table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { PRODUCT, PRODUCTS } from "@/Api/Api";
import { useTranslation } from "react-i18next";

export default function Product() {
  //states
  const [products, setPro] = useState([]);
  const [rand, rerand] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const { t } = useTranslation();

  //states
  // effect
  useEffect(() => {
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((res) => {
        setPro(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rand, page, limit]);
  // effect
  const header = [
    {
      key: "images",
      name: "Image",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "discount",
      name: "Discount %",
    },
  ];
  return (
    <>
      <h1
        className="font-bold text-[25px] text-black"
        style={{ wordSpacing: "-3px" }}
      >
        {t("Product List")}
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <p className="text-slate-400 ">
          {t("Manage your product and their roles here.")}
        </p>
        <Link to="/dashboard/product/addPro">
          <Button
            className=" w-30 block rounded-md bg-black py-1.5 px-3 border border-transparent  text-sm text-white font-semibold transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <div className="flex items-center justify-between">
              {t("Add Product")}
              <MdOutlinePersonAdd className="text-[16px] ml-2" />
            </div>
          </Button>
        </Link>
      </div>
      <Table
        header={header}
        data={products}
        deletee={PRODUCT}
        rerand={rerand}
        add="product"
        page={page}
        limit={limit}
        setPage={setPage}
        total={total}
      />
    </>
  );
}
