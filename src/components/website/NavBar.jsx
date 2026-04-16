import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { CAT } from "@/Api/Api";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/pages/Auth/Logout";

const list = [
  { name: "STORE", href: "/ProductWeb" },
  { name: "COLLECTION", href: "" },
  { name: "BLOG", href: "" },
];
export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => {
      setCategories(res.data.slice(0, 5));
    });
  }, []);

  const showCat = categories.map((cat) => {
    return (
      <a
        key={cat.id}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {cat.title}
      </a>
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur shadow-[0px_0px_10px_0px_#0000001a]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        <div className="flex items-center">
          <Link to={"/"}>
            <MdOutlineShoppingCart className="w-8 h-8 text-black" />
          </Link>
          <span className="ml-2 text-xl font-bold">N7LY</span>
        </div>
        <div className="mx-auto bg-transparent flex items-center gap-5">
          {list.map((item, index) =>
            item.name === "COLLECTION" ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 gap-2">
                        <div className="flex justify-center  gap-2">
                          {showCat}
                        </div>
                        <Button
                          variant=""
                          className="w-full mt-4"
                          onClick={() => nav("/CategorieWeb")}
                        >
                          View All
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : item.name === "STORE" ? (
              <Link
                key={index}
                to={"/ProductWeb"}
                className={`${"text-black"} mx-4 text-md font-medium hover:bg-gray-100 rounded-md px-4 py-1 transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={index}
                to={"/ProductWeb"}
                className={`${"text-black"} mx-4 text-md font-medium hover:bg-gray-100 rounded-md px-4 py-1 transition-colors duration-300`}
              >
                {item.name}
              </a>
            ),
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link to={"/shopping"}>
            <MdOutlineShoppingCart className="w-6 h-6 cursor-pointer" />
          </Link>
          {/* <MdOutlineAccountCircle className="w-6 h-6 text-black cursor-pointer" /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="shadcn"
                  className="p-2 rounded-full cursor-pointer"
                />
                <AvatarFallback>
                  {/* {user.toUpperCase().slice(0, 2)} */}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-35" align="end">
              {/* <DropdownMenuGroup></DropdownMenuGroup> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
