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

const roleMap = {
  "1995": {
    label: "Admin",
    icon: <RiAdminLine className="text-slate-500 text-[16px]" />,
  },
  "2001": {
    label: "User",
    icon: <MdOutlinePerson className="text-slate-500 text-[16px]" />,
  },
  "1996": {
    label: "Writer",
    icon: <MdOutlinePersonalInjury className="text-slate-500 text-[16px]" />,
  },
  "1999": {
    label: "Pro Manager",
    icon: <MdShoppingBasket className="text-slate-500 text-[16px]" />,
  },
};

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
  const currentuser = CurrentUser || null;
  const totalPages = total ? Math.ceil(total / limit) : 0;

  async function Delete(id) {
    if (currentuser && id === currentuser.id) return;

    try {
      await Axios.delete(`/${deletee}/${id}`);
      rerand((prev) => !prev);
    } catch (err) {
      console.log("cant delete admin");
    }
  }

  function hanleChangepage() {
    setPage((prev) => prev + 1);
  }

  function hanldePrevPage() {
    setPage((prev) => prev - 1);
  }

  function renderCell(item, keyName) {
    const value = item[keyName];

    if (roleMap[value]) {
      return (
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-slate-700">
          {roleMap[value].icon}
          <span className="text-sm font-medium">{roleMap[value].label}</span>
        </div>
      );
    }

    if (keyName === "images") {
      const images = Array.isArray(value) ? value : [];
      return (
        <div className={`flex ${images.length > 1 ? "flex-wrap gap-2" : "items-center"}`}>
          {images.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={img.image}
              alt={`product-${index}`}
              className="h-12 w-12 rounded-xl object-cover border border-slate-200"
            />
          ))}
        </div>
      );
    }

    if (keyName === "image") {
      return (
        <img
          src={value instanceof File ? URL.createObjectURL(value) : value}
          alt="item"
          className="h-12 w-12 rounded-xl object-cover border border-slate-200"
        />
      );
    }

    return <span className="text-sm text-slate-700">{value}</span>;
  }

  const headerShow = header.map((column) => (
    <th
      key={column.key}
      className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
    >
      {column.name}
    </th>
  ));

  const datashow = data.map((item) => (
    <tr
      key={item.id ?? JSON.stringify(item)}
      className="border-b border-slate-200 transition hover:bg-slate-50 even:bg-slate-50"
    >
      {header.map((column) => (
        <td key={column.key} className="px-4 py-4 align-top">
          {renderCell(item, column.key)}
        </td>
      ))}
      <td className="px-4 py-4 text-right align-top">
        <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-3 py-2">
          <button
            type="button"
            title={item.id === currentuser?.id ? "Cannot delete your account" : "Delete item"}
            onClick={() => Delete(item.id)}
            className={`rounded-full p-2 transition-colors ${
              item.id === currentuser?.id
                ? "cursor-not-allowed text-slate-400"
                : "text-red-500 hover:bg-red-50 hover:text-red-600"
            }`}
            disabled={item.id === currentuser?.id}
          >
            <AiOutlineDelete size={18} />
          </button>
          <Link
            to={`/dashboard/${add}/${item.id}`}
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            title="Edit item"
          >
            <TbUserEdit size={18} />
          </Link>
        </div>
      </td>
    </tr>
  ));

  const isLoading = data.length === 0 && total === undefined;
  const isEmpty = data.length === 0 && total !== undefined;

  return (
    <>
      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                {headerShow}
                <th className="whitespace-nowrap px-4 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="bg-slate-50">
                  <td colSpan={header.length + 1} className="py-12 text-center text-sm text-slate-500">
                    Loading items...
                  </td>
                </tr>
              ) : isEmpty ? (
                <tr className="bg-slate-50">
                  <td colSpan={header.length + 1} className="py-12 text-center text-sm text-slate-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                datashow
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing {data.length} of {total ?? data.length} items
        </p>
        <Pagination className="mx-auto sm:mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={page > 1 ? hanldePrevPage : undefined}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === index + 1}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={hanleChangepage}
                aria-disabled={page === totalPages}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
