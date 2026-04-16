import axios from "axios";
import { useEffect } from "react";
import { Google_Call_Back, mainPath } from "../../Api/Api";
import { useLocation } from "react-router";
import Cookie from "cookie-universal";

export default function GoogleCallback() {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        await axios
          .get(`${mainPath}/${Google_Call_Back}${location.search}`)
          .then((res) => {
            const Token = res.data.access_token;
            cookie.set("e-commerce", Token);
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
  return <h1>test</h1>;
}
