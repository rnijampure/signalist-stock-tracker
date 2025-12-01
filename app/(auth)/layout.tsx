import Header from "@/components/ui/Header";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" auth-layout min-h-screen text-grey-400">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="assets/icons/logo.svg"
            className="w-auto h-8"
            width={140}
            height={32}
            alt="logo"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section ">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className=" auth-blockquote italic    ">
            Signalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex item-center justify-beetween align-middle">
            <div>
              <cite className="auth-testimonial-author italic mr-0.5">
                -Ethan R.
              </cite>
              <br />
              <p className="max-md:text-xs text-gray-500 ml-2  italic">
                Retail Investor
              </p>
            </div>

            <div className="flex items-center gap-0.5 flex-1 justify-end ml-4">
              {[1, 2, 3, 4].map((star: any) => {
                return (
                  <Image
                    src="/assets/icons/star.svg"
                    alt="Rating"
                    className="w-4 h-4"
                    key={star}
                    width={12}
                    height={12}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/assets/images/dashboard.png"
            alt="Signalist Dashboard"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </main>
  );
};

export default Layout;
