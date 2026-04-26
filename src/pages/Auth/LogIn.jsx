import { useEffect, useRef, useState } from "react";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router";
import axios from "axios";
import { Login, mainPath } from "../../Api/Api";
import Loading from "../Loading";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineError } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import logo from "../../assets/shopping-cart.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "@/components/website/NavBar";

export default function LogIn() {
  const foucus = useRef("");
  const { t } = useTranslation();
  //states
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  //cookie
  const cookie = Cookie();
  //cookie
  const [load, setLoad] = useState(false);
  //error
  const [error, seterror] = useState("");
  //error

  //states

  // effect to foucus on the email input when the component is mounted
  useEffect(() => {
    foucus.current.focus();
  }, []);
  // effect to foucus on the email input when the component is mounted

  //functoin
  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);
    try {
      await axios
        .post(`${mainPath}/${Login}`, {
          email: Form.email,
          password: Form.password,
        })
        .then((res) => {
          setLoad(false);
          const Token = res.data.token;
          cookie.set("e-commerce", Token);
          const role = res.data.user.role;
          role === "1995"
            ? nav("/dashboard/dashboardlayout")
            : role === "1996"
              ? nav("/dashboard/whriter")
              : nav("/", { replace: true });
        });
    } catch (err) {
      if (err.status === 401) {
        seterror("Email or Password is incorrect");
        setLoad(false);
      }
    } finally {
      setLoad(false);
    }
  }
  //functoin
  return (
    <>
      <NavBar />
      <section className="relative flex w-full items-center justify-center overflow-hidden min-h-[calc(100vh-64px)] md:mt-14">
        {load && <Loading />}
        <div className="w-full px-4 py-6 sm:py-8">
          <Card className="relative w-full max-w-sm mx-auto ring-0 p-6 sm:p-8 shadow-lg">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-secondary relative size-12 rounded-full border">
                  <div className="flex h-full items-center justify-center">
                    <img src={logo} alt="" className="w-7 h-7" />
                  </div>
                </div>
              </div>
              <h1 className="mb-1 text-center text-2xl font-bold tracking-tight">
                {t("Welcome Back!")}
              </h1>
              <p className="text-muted-foreground text-center text-sm text-gray-600">
                {t("Log in to continue your journey")}
              </p>
            </div>

            {/* Login Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  ref={foucus}
                  type="email"
                  placeholder={t("me@example.com")}
                  className="bg-transparent ps-10 h-9 text-sm"
                  autoComplete="email"
                  value={Form.email}
                  onChange={(e) => {
                    setForm({ ...Form, email: e.target.value });
                  }}
                />
                <Mail className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
              </div>

              <div className="relative">
                <Input
                  type={"password"}
                  placeholder="Password"
                  className="bg-transparent ps-10 h-9 text-sm"
                  autoComplete="current-password"
                  value={Form.password}
                  onChange={(e) => {
                    setForm({ ...Form, password: e.target.value });
                  }}
                />
                <Lock className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute end-0 top-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
                ></Button>
              </div>
              {error !== "" && (
                <p className="flex items-center justify-center text-xs gap-1.5 text-slate-400 mx-auto mt-2">
                  <MdOutlineError className="text-[15px]" />
                  {t("Email or Password is incorrect")}
                </p>
              )}

              {/* Remember & Forgot */}
              {/* <div className="flex items-center justify-between">
              <a
                href="#"
                className="ms-auto inline-block text-sm mx-auto underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div> */}

              {/* Login Button */}
              <Button
                className="h-9 px-4 py-2 w-full cursor-pointer"
                type="submit"
              >
                {t("Log In")}
              </Button>

              {/* Social Login */}
              <div className="relative my-1 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card text-muted-foreground px-2">
                    {t("Or continue with")}
                  </span>
                </div>
              </div>

              <div className=" flex justify-center">
                <Button
                  href={"http://127.0.0.1:8000/login-google"}
                  variant="outline"
                  className="h-9 px-4 py-2 w-full cursor-pointer hover:bg-black"
                >
                  <FcGoogle />
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-4 flex justify-center gap-1 text-center text-sm">
              <span>{t("Don't have an account?")}</span>
              <Link
                to={"/signin"}
                className="font-medium text-black hover:text-black underline underline-offset-2"
              >
                {t("Create an account")}
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
