"use client";
import { ArrowUpIcon, ArrowUpRightIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { user } from "../../lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserMenu = () => {
  const router = useRouter();
  const handelSignout = () => {
    router.push("/sign-in");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="items-center ">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Submit"
            className="flex items-center gap-3 text-grey-4  place-items-center"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-yellow-600 text-sm font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:hidden  flex-col itens-start">
              <span className=" text-base font-medium text-grey-400">
                {user.email}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-grey-400 w-auto">
          <DropdownMenuItem>
            <DropdownMenuLabel>
              <div className=" flex   items-center gap-3 py-0">
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="font-bold text-yellow-200">{user.name}</div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-grey-600"></DropdownMenuSeparator>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem
            onClick={handelSignout}
            className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
          >
            <LogOut className="h-2 w-2   sm-block hover:text-yellow-200" />
            Sign Out
          </DropdownMenuItem>{" "}
          {/**/}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
