import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavItems from "./NavItems";
const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={143}
            height={40}
            className=" w-auto h-8 cursor-pointer"
          />
        </Link>
        <NavItems></NavItems>
      </div>
    </header>
  );
};

export default Header;
