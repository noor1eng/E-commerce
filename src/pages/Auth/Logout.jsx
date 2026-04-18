import axios from "axios";
import { LogoutPath, mainPath } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const cookie = Cookie();
  const nav = useNavigate();
  const { t } = useTranslation();

  //functoin
  async function handleLogout() {
    try {
      await axios
        .get(`${mainPath}/${LogoutPath}`, {
          headers: {
            Authorization: "Bearer " + cookie.get("e-commerce"),
          },
        })
        .then((res) => {
          cookie.remove("e-commerce");
          nav("/login");
        });
    } catch (err) {
      console.log(err);
    }
  }
  //functoin
  return (
    <button
      className="text-[13px] font-semibold rounded-md text-start text-red-600 w-full hover:bg-red-50"
      type="submit"
      onClick={handleLogout}
    >
      {t("Log out")}
    </button>
  );
}
