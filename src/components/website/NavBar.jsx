import { MdOutlineShoppingCart } from "react-icons/md";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/pages/Auth/Logout";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const list = [
  { name: "STORE", href: "/ProductWeb" },
  { name: "COLLECTION", href: "" },
  { name: "OFFERS", href: "" },
];
export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/"}>
            <MdOutlineShoppingCart className="w-8 h-8 text-black" />
          </Link>
          <span className="ml-2 text-xl font-bold">N7LY</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex mx-auto bg-transparent items-center gap-5">
          {list.map((item, index) =>
            item.name === "COLLECTION" ? (
              <NavigationMenu key={index}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 gap-2">
                        <div className="flex justify-center gap-2">
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
                href={item.href}
                className={`${"text-black"} mx-4 text-md font-medium hover:bg-gray-100 rounded-md px-4 py-1 transition-colors duration-300`}
              >
                {item.name}
              </a>
            ),
          )}
        </div>
        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-6">
                {list.map((item, index) =>
                  item.name === "COLLECTION" ? (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.name}
                      </h3>
                      <div className="flex flex-col gap-2">{showCat}</div>
                      <Button
                        variant=""
                        className="w-full mt-4"
                        onClick={() => {
                          nav("/CategorieWeb");
                          setIsOpen(false);
                        }}
                      >
                        View All
                      </Button>
                    </div>
                  ) : item.name === "STORE" ? (
                    <Link
                      key={index}
                      to={"/ProductWeb"}
                      className="text-black text-md font-medium hover:bg-gray-100 rounded-md px-4 py-2 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={index}
                      href={item.href}
                      className="text-black text-md font-medium hover:bg-gray-100 rounded-md px-4 py-2 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
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
