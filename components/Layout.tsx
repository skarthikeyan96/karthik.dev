import Link from "next/link";
import { useRouter } from "next/router";
import { boldFontClass, navLogoClass, normalFontClass } from "../lib/utils";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import ThemeToggler from "./ThemeToggler";

interface Layout {
  children: JSX.Element;
}

const Layout = ({ children }: Layout) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <nav className="w-full  flex items-center justify-between  shadow-sm p-6">
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

      <main className="flex flex-col  px-4 mt-16">
        <div className="flex flex-col items-start max-w-2xl mx-auto pb-16">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
