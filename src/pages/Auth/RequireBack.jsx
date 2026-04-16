import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";

export default function RequireBack() {
  const cookie = Cookie();
  const Token = cookie.get("e-commerce");
  return Token ? window.history.back() : <Outlet />;
}
