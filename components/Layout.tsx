import Link from "next/link";

interface Layout {
    children: JSX.Element
}


const Layout = ({ children }: Layout) => {
  return (
    <div className="flex flex-col justify-center p-8">
      <nav className="w-full max-w-2xl flex items-center justify-center mx-auto">
        <Link href="/" className="mr-2">
          <a className="font-normal  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all">
            Home
          </a>
        </Link>
        <Link href="/projects">
          <a className="font-normal  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all">
            Projects
          </a>
        </Link>
        <Link href="/blog">
          <a className="font-normal  hidden md:inline-block p-1 sm:px-3 sm:py-2  transition-all">
            Blogs
          </a>
        </Link>
      </nav>

      <main className="flex flex-col justify-center px-8 mt-16">
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-16">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
