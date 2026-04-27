import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/pages/Auth/Logout";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { USER } from "@/Api/Api";

export default function AccountBtn() {
  const { t } = useTranslation();
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="shadcn"
            className="p-2 rounded-full cursor-pointer md:w-10 md:h-10 w-20"
          />
          <AvatarFallback>{user.toUpperCase().slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35" align="end">
        {token === undefined ? (
          <DropdownMenuGroup>
            <Link to={"/signin"}>
              <DropdownMenuItem className="cursor-pointer">
                {t("Sign In")}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            <Link to={"/login"}>
              <DropdownMenuItem className="cursor-pointer">
                {t("Log In")}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                {t("Profile")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
