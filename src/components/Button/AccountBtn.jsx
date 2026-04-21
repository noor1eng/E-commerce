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

export default function AccountBtn({ user }) {
  const { t } = useTranslation();

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
        <DropdownMenuGroup>
          <DropdownMenuItem>{t("Profile")}</DropdownMenuItem>
          <DropdownMenuItem>{t("Billing")}</DropdownMenuItem>
          <DropdownMenuItem>{t("Settings")}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
