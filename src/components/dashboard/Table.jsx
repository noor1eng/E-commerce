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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PaginationCom from "../pagination/Pagination";
import { Rander } from "./context/RanderContext";
import { useContext } from "react";

const roleMap = {
  1995: {
    label: "Admin",
    icon: <RiAdminLine className="size-3.5" />,
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
  2001: {
    label: "User",
    icon: <MdOutlinePerson className="size-3.5" />,
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  1996: {
    label: "Writer",
    icon: <MdOutlinePersonalInjury className="size-3.5" />,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  1999: {
    label: "Pro Manager",
    icon: <MdShoppingBasket className="size-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

function SkeletonRow({ cols }) {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="border-b border-slate-100">
      {Array.from({ length: cols }).map((_, j) => (
        <td key={j} className="px-5 py-4">
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-100" />
        </td>
      ))}
      <td className="px-5 py-4">
        <div className="ml-auto h-8 w-20 animate-pulse rounded-full bg-slate-100" />
      </td>
    </tr>
  ));
}

function renderCell(item, keyName) {
  const value = item[keyName];

  if (roleMap[value]) {
    const role = roleMap[value];
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${role.className}`}
      >
        {role.icon}
        {role.label}
      </span>
    );
  }

  if (keyName === "images") {
    const images = Array.isArray(value) ? value : [];
    return (
      <div className="flex items-center gap-1.5">
        {images.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={img.image}
            alt={`img-${i}`}
            className="h-10 w-10 rounded-lg border border-slate-200 object-cover shadow-sm"
          />
        ))}
        {images.length > 3 && (
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-500">
            +{images.length - 3}
          </span>
        )}
      </div>
    );
  }

  if (keyName === "image") {
    return (
      <img
        src={value instanceof File ? URL.createObjectURL(value) : value}
        alt="item"
        className="h-10 w-10 rounded-lg border border-slate-200 object-cover shadow-sm"
      />
    );
  }

  return (
    <span className="text-sm text-slate-700 leading-relaxed">
      {value ?? "—"}
    </span>
  );
}

export default function Table({
  header,
  data,
  CurrentUser,
  deletee,
  add,
  limit,
  page,
  setPage,
  total,
}) {
  const currentuser = CurrentUser || null;
  const totalPages = total ? Math.ceil(total / limit) : 0;
  const isLoading = data.length === 0 && total === undefined;
  const isEmpty = data.length === 0 && total !== undefined;
  const { rander, rerander } = useContext(Rander);
  console.log(rander);

  async function Delete(id) {
    if (currentuser && id === currentuser.id) return;
    try {
      await Axios.delete(`/${deletee}/${id}`);
      rerander((prev) => !prev);
    } catch {
      console.log("cant delete");
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mt-6 space-y-4">
        {/* ── Table card ── */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              {/* Head */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  {header.map((col) => (
                    <th
                      key={col.key}
                      className="whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400"
                    >
                      {col.name}
                    </th>
                  ))}
                  <th className="whitespace-nowrap px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <SkeletonRow cols={header.length} />
                ) : isEmpty ? (
                  <tr>
                    <td
                      colSpan={header.length + 1}
                      className="py-20 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                          <MdShoppingBasket className="size-6 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-500">
                          No records found
                        </p>
                        <p className="text-xs text-slate-400">
                          Try adjusting your filters or add a new item
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id ?? JSON.stringify(item)}
                      className="group transition-colors hover:bg-slate-50/70"
                    >
                      {header.map((col) => (
                        <td key={col.key} className="px-5 py-3.5 align-middle">
                          {renderCell(item, col.key)}
                        </td>
                      ))}

                      {/* Actions cell */}
                      <td className="px-5 py-3.5 text-right align-middle">
                        <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-1.5 py-1 shadow-xs opacity-70 transition-opacity group-hover:opacity-100">
                          {/* Delete */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => Delete(item.id)}
                                disabled={item.id === currentuser?.id}
                                className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors
                                  ${
                                    item.id === currentuser?.id
                                      ? "cursor-not-allowed text-slate-300"
                                      : "text-slate-400 hover:bg-red-50 hover:text-red-500"
                                  }`}
                              >
                                <AiOutlineDelete size={15} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              {item.id === currentuser?.id
                                ? "Cannot delete your account"
                                : "Delete"}
                            </TooltipContent>
                          </Tooltip>

                          {/* Divider */}
                          <div className="h-4 w-px bg-slate-200" />

                          {/* Edit */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={`/dashboard/${add}/${item.id}`}
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                              >
                                <TbUserEdit size={15} />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              Edit
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footer ── */}
        {!isLoading && (
          <div className="flex flex-col items-start justify-between gap-3 px-1 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {data.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-600">
                {total ?? data.length}
              </span>{" "}
              items
            </p>
            {totalPages > 1 && (
              <PaginationCom
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
