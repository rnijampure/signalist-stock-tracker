"use client";
import Link from "next/link";
import { NavItems as navItems } from "@/lib/constants";
import { use } from "react";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

const NavItems = () => {
  const pathname = usePathname();
  const isActiveNow = (path: string) => {
    console.log("pathname", pathname.startsWith(path));
    if (path === "/") return true;
    return pathname.startsWith(path);
  };
  console.log("navItems", navItems);
  return (
    <ul className="flex gap-6 w-full justify-end">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`hover:text-gray-200 transition-colors ${
              isActiveNow(item.href) ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li className="text-gray-300">
        <UserMenu />
      </li>
    </ul>
  );
};

export default NavItems;
