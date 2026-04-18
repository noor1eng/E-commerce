//rebuild
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../pages/Loading";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
export default function AddUser() {
  //states
  const foucus = useRef("");
  const [Form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  const { t } = useTranslation();
  //states

  //effect
  useEffect(() => {
    foucus.current.focus();
  }, []);
  //effect

  //function
  async function Adduser(e) {
    setLoad(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/add`, {
        name: Form.name,
        email: Form.email,
        password: Form.password,
        role: role,
      }).then((res) => {
        window.location.pathname = "/dashboard/users";
        setLoad(false);
      });
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }
  //function
  return (
    <div className=" absolute top-0 left-0 w-full h-screen bg-[#00000047] flex justify-center items-center">
      <form
        className=" relative mt-7 mb-2 w-100 mx-auto bg-white p-6 rounded-md"
        onSubmit={Adduser}
      >
        <h4 className="block text-xl font-medium text-black">
          {t("Add New User")}
        </h4>
        <p className="text-slate-500 font-light">
          {t("Add the user here. Click save when you're done.")}
        </p>
        <MdClose
          className="ml-auto absolute top-2.5 right-2.5 text-gray-700 hover:text-black cursor-pointer"
          onClick={() => {
            nav("/dashboard/users");
          }}
        />
        <div className="mb-1 flex flex-col gap-4 mt-10">
          <div className="w-full max-w-sm min-w-50">
            <input
              ref={foucus}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 placeholder:absolute placeholder:left-0 focus:placeholder:text-transparent text-slate-700 text-sm border-b border-slate-200  px-3 py-2 transition placeholder:duration-500 ease outline-none"
              placeholder="Your Name"
              value={Form.name}
              onChange={(e) => {
                setForm({ ...Form, name: e.target.value });
              }}
            />
          </div>

          <div className="w-full max-w-sm min-w-50">
            <input
              type="email"
              required
              className="w-full bg-transparent placeholder:text-slate-400 placeholder:absolute placeholder:left-0 focus:placeholder:text-transparent text-slate-700 text-sm border-b border-slate-200 px-3 py-2  transition placeholder:duration-500 ease outline-none"
              placeholder="Your Email"
              value={Form.email}
              onChange={(e) => {
                setForm({ ...Form, email: e.target.value });
              }}
            />
          </div>

          <div className="w-full max-w-sm min-w-50">
            <input
              type="password"
              className="w-full bg-transparent placeholder:text-slate-400 placeholder:absolute placeholder:left-0 focus:placeholder:text-transparent text-slate-700 text-sm border-b border-slate-200  px-3 py-2 transition placeholder:duration-500 ease outline-none"
              placeholder="Your Password"
              value={Form.password}
              onChange={(e) => {
                setForm({ ...Form, password: e.target.value });
              }}
            />
          </div>

          <div class="relative">
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="w-30 bg-transparent mb-5 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option value="" disabled selected>
                {t("Role")}:
              </option>
              <option value="1995">{t("Admin")}</option>
              <option value="2001">{t("User")}</option>
              <option value="1996">{t("Whriter")}</option>
              <option value="1999">{t("Product")}</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Button
            className="mt-4 w-30 cursor-pointer
             rounded-md ml-auto bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-800 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={
              Form.name.length <= 0 ||
              Form.password.length < 8 ||
              Form.email.length <= 0 ||
              role === ""
            }
          >
            {t("Save Changes")}
          </Button>
        </div>
      </form>
      {load && <Loading />}
    </div>
  );
}
