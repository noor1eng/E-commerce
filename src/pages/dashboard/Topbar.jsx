import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { mainPath, USER } from "../../Api/Api";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Cookie from "cookie-universal";
import { Navigate } from "react-router";
import Logout from "../Auth/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Topbar({ toggleSidebar }) {
  //states
  const [user, setUser] = useState("");
  const [email, setemail] = useState("");

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
        setUser(res.data.name);
        setemail(res.data.email);
      })
      .catch(() => <Navigate to={"/login"} replace={true} />);
  }, []);
  //states

  return (
    <div className="flex justify-between items-center md:mb-9 mb-5 gap-6 md:gap-0">
      <div className="w-[300px] max-w-sm flex justify-center gap-6 items-center">
        <MdOutlineSpaceDashboard
          onClick={toggleSidebar}
          className="text-[30px] cursor-pointer text-black border border-solid border-gray-300 rounded-lg p-[5px] hover:bg-slate-100"
        />
        <Field orientation="horizontal">
          <Input
            type="search"
            className="rounded-xl max-w-[200px]"
            placeholder="Search..."
          />
          <Button className="rounded-xl hidden md:block">Search</Button>
        </Field>
      </div>
      <div className="flex items-center gap-7">
        <div className=" rounded-full hover:bg-slate-200 p-1.5 cursor-pointer">
          <MdOutlineWbSunny className="text-[18px]" />
        </div>
        <div className=" rounded-full hover:bg-slate-200 p-1.5 cursor-pointer">
          <MdOutlineSettings className="text-[18px]" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="shadcn"
                className="p-2 rounded-full cursor-pointer"
              />
              <AvatarFallback>{user.toUpperCase().slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-35" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
