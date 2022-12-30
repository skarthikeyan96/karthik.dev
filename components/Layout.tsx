import Link from "next/link";
import { useRouter } from "next/router";
import { boldFontClass, navLogoClass, normalFontClass } from "../lib/utils";
import ThemeToggler from "./ThemeToggler";
import { useState } from "react";

interface Layout {
  children: JSX.Element;
}

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
            <Link href="/">
              <a
                className={
                  router.pathname === "/" ? boldFontClass : normalFontClass
                }
              >
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a
                className={
                  router.pathname === "/projects"
                    ? boldFontClass
                    : normalFontClass
                }
              >
                Projects
              </a>
            </Link>
            <Link href="/blog">
              <a
                className={
                  router.pathname === "/blog" ? boldFontClass : normalFontClass
                }
              >
                Blogs
              </a>
            </Link>

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

{
  /**Mobile nav */
}
      <div className="md:hidden fixed bottom-0 bg-white px-6 py-8 w-full z-0 border border-1 dark:bg-black">
        <div>
          <a
            className={
              isShowing
                ? `hidden`
                : `${navLogoClass} font-extrabold text-xl tracking-normal`
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
          <Link href="/">
            <a
              className={router.pathname === "/" ? `font-bold` : `font-normal`}
            >
              Home
            </a>
          </Link>
          <Link href="/projects">
            <a
              className={
                router.pathname === "/projects" ? `font-bold` : `font-normal`
              }
            >
              Projects
            </a>
          </Link>
          <Link href="/blog">
            <a
              className={
                router.pathname === "/blog" ? `font-bold` : `font-normal`
              }
            >
              Blogs
            </a>
          </Link>

          <Link href="#">
            <div className="w-full">
              <ThemeToggler isMobileNavVisible={isShowing}/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
