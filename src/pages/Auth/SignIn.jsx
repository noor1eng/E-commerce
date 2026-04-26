import img from "../../assets/Mobile login-rafiki.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookie from "cookie-universal";
import { mainPath, Register } from "../../Api/Api";
import { MdAccountCircle } from "react-icons/md";
import Loading from "../Loading";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineError } from "react-icons/md";
import { Button } from "@/components/ui/button";
import logo from "../../assets/shopping-cart.png";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import NavBar from "@/components/website/NavBar";

export default function SignIn() {
  //satets
  const foucus = useRef("");
  const { t } = useTranslation();
  const [Form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });
  const [showEror, setShoweror] = useState(false);
  //error
  const [Email, setEmail] = useState("");
  //error
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  //cookie
  const cookie = Cookie();
  //cookie
  //satets

  //effect
  useEffect(() => {
    foucus.current.focus();
  }, []);
  //effect

  //functions
  async function hanldeSubmit(e) {
    e.preventDefault();
    setShoweror(true);
    setLoad(true);
    try {
      await axios
        .post(`${mainPath}/${Register}`, {
          name: Form.name,
          email: Form.email,
          password: Form.password,
          confirm: Form.confirmpass,
        })
        .then((res) => {
          setLoad(false);
          //get token and set him in cookie
          const Token = res.data.token;
          cookie.set("e-commerce", Token);
          //get token and set him in cookie
          nav("/dashboard");
        });
    } catch (err) {
      setLoad(false);
      if (err.response.status === 422) {
        setEmail("email is already taken");
      }
    }
  }
  //functions
  return (
    <>
      <NavBar />
      <section className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden min-h-[calc(100vh-64px)] md:mt-14">
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
                {t("Create Your Account")}
              </h1>
              <p className="text-muted-foreground text-center text-sm text-gray-600">
                {t("Get started by filling out the form below")}
              </p>
            </div>

            {/* Sign Up Form */}
            <form className="flex flex-col gap-4" onSubmit={hanldeSubmit}>
              <div className="relative">
                <Input
                  ref={foucus}
                  id="fullname-signup3-j9as8d"
                  type="text"
                  placeholder={t("Full Name")}
                  className="bg-transparent ps-10 h-9 text-sm"
                  autoComplete="name"
                  value={Form.name}
                  onChange={(e) => {
                    setForm({ ...Form, name: e.target.value });
                  }}
                />
                <User className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
              </div>

              {/* show error for name */}
              {showEror && Form.name <= 0 && (
                <p className="flex items-center text-xs gap-1.5 text-slate-400">
                  <MdOutlineError className="text-[15px]" />
                  {t("Not Valid Name")}
                </p>
              )}
              {/* show error for name */}

              <div className="relative">
                <Input
                  id="email-signup3-k2l3f9"
                  type="email"
                  placeholder={t("me@example.com")}
                  className="bg-transparent ps-10 h-9 text-sm"
                  autoComplete="email"
                  required
                  value={Form.email}
                  onChange={(e) => {
                    setForm({ ...Form, email: e.target.value });
                  }}
                />
                <Mail className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
              </div>

              {/* show error for email */}
              {showEror && Email !== "" && (
                <p className="flex items-center text-xs gap-1.5 text-slate-400">
                  <MdOutlineError className="text-[15px]" />
                  {Email}
                </p>
              )}
              {/* show error for eamil */}

              <div className="relative">
                <Input
                  id="password-signup3-m4n5b6"
                  type="password"
                  placeholder={t("Password")}
                  className="bg-transparent ps-10 h-9 text-sm"
                  autoComplete="new-password"
                  value={Form.password}
                  onChange={(e) => {
                    setForm({ ...Form, password: e.target.value });
                  }}
                />
                <Lock className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
              </div>

              {/* show error for pass */}
              {showEror && Form.password.length < 8 && (
                <p className="flex items-center text-xs gap-1.5 text-slate-400">
                  <MdOutlineError className="text-[15px]" />
                  {t(
                    "Use at least 8 characters, one uppercase, one lowercase and one number.",
                  )}
                </p>
              )}
              {/* show error for pass */}

              <div className="relative">
                <Input
                  id="password-signup3-m4n5b6"
                  type="password"
                  placeholder={t("Password Confirm")}
                  className="bg-transparent ps-10 h-9 text-sm"
                  autoComplete="new-password"
                  value={Form.confirmpass}
                  onChange={(e) => {
                    setForm({ ...Form, confirmpass: e.target.value });
                  }}
                />
                <Lock className="text-muted-foreground absolute start-3 top-1/2 size-5 -translate-y-1/2" />
              </div>

              {/* show error for confirm pass */}
              {showEror && Form.confirmpass !== Form.password && (
                <p className="flex items-center text-xs gap-1.5 text-slate-400">
                  <MdOutlineError className="text-[15px]" />
                  {t("Password confirm incorrect")}
                </p>
              )}
              {/* show error for confirm pass */}

              <Button
                className="h-9 px-4 py-2 w-full cursor-pointer"
                type="submit"
              >
                {t("Create Account")}
              </Button>

              {/* Social Sign Up */}
              <div className="relative my-1 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card text-muted-foreground px-2">
                    {t("Or sign up with")}
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <Button
                  href={"http://127.0.0.1:8000/login-google"}
                  variant="outline"
                  className="h-9 px-4 py-2 w-full  cursor-pointer hover:bg-black"
                >
                  <FcGoogle />
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <p className="mt-4 flex justify-center gap-1 text-center text-sm">
              <span>{t("Already have an account?")}</span>
              <Link
                to={"/login"}
                className="font-medium text-black  hover:text-black underline underline-offset-2"
              >
                {t("Sign in")}
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
