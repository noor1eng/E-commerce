import { Link } from "react-router-dom";
import img from "../../assets/403 Error Forbidden-bro (1).png";
import { useTranslation } from "react-i18next";
export default function Erro403({ role }) {
  const { t } = useTranslation();
  return (
    <div>
      <img src={img} alt="" className="w-[500px] mx-auto" />
      <Link to={role === "2001" ? "/" : "/dashboard/whriter"} replace={true}>
        <button
          className="w-[200px] mx-auto block cursor-pointer
             rounded-full bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          {role === "2001" ? t("Go Home") : t("Go Whriter")}
        </button>
      </Link>
    </div>
  );
}
