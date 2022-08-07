import Link from "next/link";
import { useRouter } from "next/router";


interface Layout {
    children: JSX.Element
}


const Layout = ({ children }: Layout) => {
    const router = useRouter();

  return (
    <div className="flex flex-col p-8">
      <nav className="w-full max-w-2xl flex mx-auto">
        <Link href="/" >
          <a className={router.pathname === "/" ? "font-bold  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all" :"font-normal  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all" }>
            Home
          </a>
        </Link>
        <Link href="/projects">
          <a className={router.pathname === "/projects" ? "font-bold  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all" :"font-normal  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all" }>
            Projects
          </a>
        </Link>
        <Link href="/blog">
          <a className={router.pathname === "/blog" ? "font-bold  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all" :"font-normal  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all" }>
            Blogs
          </a>
        </Link>
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
