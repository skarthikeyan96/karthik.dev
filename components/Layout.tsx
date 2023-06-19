import Link from "next/link";
import { useRouter } from "next/router";
import { boldFontClass, navLogoClass, normalFontClass } from "../lib/utils";
import ThemeToggler from "./ThemeToggler";
import { useState } from "react";

interface Layout {
  children: JSX.Element;
}

const navItems = [
  {
    name: "home",
    route: "/",
  },
  {
    name: "blog",
    route: "/blog",
  },
  {
    name: "projects",
    route: "/projects",
  },
  {
    name: "resume",
    route: "https://peerlist.io/karthik_coder", // link to the peerlist or google docs
    setTarget: true
  }
];

const Layout = ({ children }: Layout) => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        id="overlay"
        style={{
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          top: 0,
          left: 0,
          bottom: 0,
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
        className={isShowing ? "block" : "hidden"}
        onClick={() => setIsShowing(false)}
      ></div>
      <div>
        <nav className="w-full hidden md:flex items-center justify-between shadow-md dark:shadow-black p-6">
          <div>
            <Link href="/">
              <a
                className={`${navLogoClass} font-extrabold text-xl tracking-normal`}
              >
                Karthikeyan
              </a>
            </Link>
          </div>
          <div className="flex space-x-8 items-center">
            
          {navItems.map((item, index) => {
            if (item.route.length !== 0) {
              return (
                <Link href={item.route} key={index}>
                  <a
                    target={item.setTarget ? "_blank" : ""}
                    className={
                      router.pathname === item.route
                        ? `font-bold capitalize`
                        : `font-normal capitalize`
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              );
            }
          })}

            <Link href="#">
              <ThemeToggler />
            </Link>
          </div>
        </nav>

        <main className="flex flex-col px-6 mt-8 md:mt-16">
          <div className="flex flex-col items-start max-w-2xl mx-auto pb-16">
            {children}
          </div>
        </main>
      </div>

      {/**Mobile nav */}
      <div className="md:hidden fixed bottom-0 bg-white px-6 py-8 w-full z-0  border-t-2 border-b-gray-900 dark:border-0 dark:bg-black">
        <div>
          <a
            className={
              isShowing
                ? `hidden`
                : `${navLogoClass} font-extrabold text-xl tracking-normal border-1`
            }
            onClick={() => setIsShowing(!isShowing)}
          >
            Menu
          </a>
        </div>

        <div
          className={
            isShowing
              ? `flex h-auto flex-col justify-start space-y-6 w-full`
              : `hidden`
          }
        >
          {navItems.map((item, index) => {
            if (item.route.length !== 0) {
              return (
                <Link href={item.route} key={index}>
                  <a
                    className={
                      router.pathname === item.route
                        ? `font-bold capitalize`
                        : `font-normal capitalize`
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              );
            }
          })}

          <Link href="#">
            <div className="w-full">
              <ThemeToggler isMobileNavVisible={isShowing} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
