import { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { Axios } from "@/Api/Axios";
import { USER } from "@/Api/Api";
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
import { Rander } from "./context/RanderContext";

export default function Edituser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [able, disable] = useState(true);
  const { rander, rerander } = useContext(Rander);
  const [role, setRole] = useState("");
  const pathID = useParams().id;
  const nav = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    Axios.get(`/${USER}/${pathID}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
        disable(false);
      })
      .catch(() => {
        nav("/dashboard/users/page/404", { replace: true });
      });
  }, [nav, pathID]);

  async function UpdateUser(e) {
    e.preventDefault();
    try {
      await Axios.post(`${USER}/edit/${pathID}`, {
        name,
        email,
        role,
      });
      rerander((prev) => !prev);
      nav("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 backdrop-blur-sm px-4 py-8">
      <Card className="w-full max-w-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">{t("Edit User")}</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              {t("Update the user details and save your changes.")}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={() => nav("/dashboard/users")}
          >
            <MdClose className="h-5 w-5" />
          </Button>
        </div>

        <CardContent className="px-6 py-6">
          <form className="grid gap-6" onSubmit={UpdateUser}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Your Name")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={t("Your Name")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email")}</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={t("Your Email")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{t("Role")}</Label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                >
                  <option value="1995">Admin</option>
                  <option value="2001">User</option>
                  <option value="1996">{t("Whriter")}</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-slate-500">
                  ▾
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={able}
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
