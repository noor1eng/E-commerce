import { AiOutlineDelete } from "react-icons/ai";
import {
  MdOutlinePerson,
  MdOutlinePersonalInjury,
  MdShoppingBasket,
} from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Axios } from "@/Api/Axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Table({
  header,
  data,
  CurrentUser,
  rerand,
  deletee,
  noUser,
  add,
  limit,
  page,
  setPage,
  total,
}) {
  const currentuser = CurrentUser || false;
  const nouser = noUser || false;
  //delete user
  async function Delete(id) {
    try {
      await Axios.delete(`/${deletee}/${id}`).then((res) => {
        rerand((prev) => !prev);
      });
    } catch (err) {
      console.log("cant delete admin");
    }
  }
  //delete user

  //change page
  function hanleChangepage() {
    setPage((prev) => prev + 1);
  }
  function hanldePrevPage() {
    setPage((prev) => prev - 1);
  }
  //change page
  //header table show
  const headerShow = header.map((header) => {
    return (
      <th className="p-3 border-b border-slate-300 text-start">
        <p className="block text-sm font-semibold leading-none text-black">
          {header.name}
        </p>
      </th>
    );
  });
  //header table show

  const totalPages = Math.ceil(total / limit);

  const filterData = data;
  const datashow = filterData.map((item, key) => {
    const admin = "admin";
    const Roleuser = "user";
    const whriter = "whriter";
    const pro = "pro manger";
    const imageProduct = item.images ? item.images : [];
    const imageshow = imageProduct.map((img, index) => {
      return (
        <img
          key={index}
          src={img.image}
          alt="product"
          className="w-10 h-10 object-cover rounded"
        />
      );
    });
    return (
      <tr key={key} className=" hover:bg-slate-100">
        {header.map((item2, key2) => {
          return (
            <td key={key2} className="p-3 border-b border-slate-200">
              <p className="block text-sm text-black">
                {item[item2.key] === "1995" ? (
                  <div className="flex  items-center gap-1.5">
                    <RiAdminLine className="text-slate-500 text-[14px]" />
                    {admin}
                  </div>
                ) : item[item2.key] === "2001" ? (
                  <div className="flex  items-center gap-1.5">
                    <MdOutlinePerson className="text-[17px] text-slate-500" />
                    {Roleuser}
                  </div>
                ) : item[item2.key] === "1996" ? (
                  <div className="flex  items-center gap-1.5">
                    <MdOutlinePersonalInjury className="text-[17px] text-slate-500" />
                    {whriter}
                  </div>
                ) : item[item2.key] === "1999" ? (
                  <div className="flex  items-center gap-1.5">
                    <MdShoppingBasket className="text-[17px] text-slate-500" />
                    {pro}
                  </div>
                ) : item2.key === "images" ? (
                  <div
                    className={`${imageshow.length > 1 ? "grid grid-cols-4 gap-2" : ""}`}
                  >
                    {imageshow}
                  </div>
                ) : item2.key === "image" ? (
                  <img
                    src={
                      item[item2.key] instanceof File
                        ? URL.createObjectURL(item[item2.key])
                        : item[item2.key]
                    }
                    alt="image"
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  item[item2.key]
                )}
                {currentuser && item[item2.key] === currentuser.name && " (me)"}
              </p>
            </td>
          );
        })}
        {/* actoin fixed */}
        <td className="p-3 border-b border-slate-200">
          <div className="flex justify-center items-center gap-4">
            <AiOutlineDelete
              className={`${item.id === currentuser.id ? "text-gray-400" : "text-red-500"} ${item.id === currentuser.id ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                Delete(item.id);
              }}
            />
            <Link to={`/dashboard/${add}/${item.id}`}>
              <TbUserEdit className="text-slate-700 cursor-pointer" />
            </Link>
          </div>
        </td>
        {/* actoin fixed */}
      </tr>
    );
  });
  //data table show

  return (
    <>
      <div className="relative flex flex-col w-full shadow-[0px_0px_2px_0px_#0000002b] rounded-lg mt-5 max-h-[410px] overflow-scroll">
        <table className="w-full table-auto min-w-max rounded-sm">
          <thead className="hover:bg-slate-100">
            <tr>
              {headerShow}
              <th className="p-3 border-b border-slate-300 text-center">
                <p className="block text-sm font-semibold leading-none text-black">
                  Actoin
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? ( // if date lenght is zero then show loading
              <tr className=" bg-slate-100 text-black text-center">
                <td colSpan={12} className=" animate-pulse p-1.5">
                  loading ...
                </td>
              </tr>
            ) : data.length === 1 && nouser ? (
              <tr className=" text-center bg-slate-100">
                <td colSpan={12} className=" animate-pulse text-black p-1.5">
                  No User Found
                </td>
              </tr>
            ) : (
              datashow
            )}
          </tbody>
        </table>
      </div>
      <Pagination className={"mt-3 mx-auto"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={page > 1 ? hanldePrevPage : undefined}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {/* pages number */}
          {Array.from({ length: Math.min(totalPages, 5) }).map((num, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index + 1}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
              {/* pages number */}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={hanleChangepage}
              aria-disabled={page === totalPages}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
