//rebuild
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../pages/Loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { useTranslation } from "react-i18next";

export default function AddUser() {
  const focus = useRef(null);
  const [Form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    focus.current?.focus();
  }, []);

  async function Adduser(e) {
    e.preventDefault();
    setLoad(true);

    try {
      await Axios.post(`${USER}/add`, {
        name: Form.name,
        email: Form.email,
        password: Form.password,
        role,
      });
      nav("/dashboard/users");
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4 py-8 backdrop-blur-sm">
      <Card className="w-full max-w-2xl overflow-hidden shadow-2xl">
        <CardHeader className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5">
          <div>
            <CardTitle className="text-2xl">{t("Add New User")}</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              {t("Create a new user account and assign the correct role.")}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={() => nav("/dashboard/users")}
          >
            <MdClose className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="px-6 py-6">
          <form className="grid gap-6" onSubmit={Adduser}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Your Name")}</Label>
                <Input
                  id="name"
                  ref={focus}
                  value={Form.name}
                  onChange={(e) => setForm({ ...Form, name: e.target.value })}
                  placeholder={t("Your Name")}
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={Form.email}
                  onChange={(e) => setForm({ ...Form, email: e.target.value })}
                  placeholder={t("Your Email")}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">{t("Password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={Form.password}
                  onChange={(e) => setForm({ ...Form, password: e.target.value })}
                  placeholder={t("Your Password")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{t("Role")}</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                >
                  <option value="" disabled>
                    {t("Select Role")}
                  </option>
                  <option value="1995">{t("Admin")}</option>
                  <option value="2001">{t("User")}</option>
                  <option value="1996">{t("Whriter")}</option>
                  <option value="1999">{t("Product")}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  Form.name.length === 0 ||
                  Form.email.length === 0 ||
                  Form.password.length < 8 ||
                  role === ""
                }
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/20 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("Save Changes")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {load && <Loading />}
    </div>
  );
}
