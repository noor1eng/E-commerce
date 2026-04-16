import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { mainPath, USER } from "../../Api/Api";
import Loading from "../Loading";
import Erro403 from "./E403";

export default function ProtectRoute({ allowedRole }) {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const cookie = Cookie();
  const Token = cookie.get("e-commerce");
  useEffect(() => {
    axios
      .get(`${mainPath}/${USER}`, {
        headers: {
          Authorization: "Bearer " + Token,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => nav("/login"));
  }, []);
  return Token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Erro403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
