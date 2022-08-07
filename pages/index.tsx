import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [posts, setPost] = useState<Array<{}>>();

  const fetchAndStoreBlogPosts = async () => {
    let response = await fetch(
      `https://dev.to/api/articles?username=imkarthikeyan`
    );
    let posts = await response.json();
    setPost(posts);
  };

  useEffect(() => {
    fetchAndStoreBlogPosts();
  }, []);

  const renderPost = () => {
    posts?.map((post) => {});
  };

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
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black ">
              Karthikeyan
            </h1>
            <h2 className="mb-4 pt-1">
              Software Engineer
              <span className="font-semibold"> @ Granicus</span>
            </h2>
            <p className="text-gray-600  mb-16">
              I am a software developer specialised in Javascript and love to
              solve problems using code. I like to share my knowledge by writing
              technical blogs.
            </p>
          </div>
          <div className="text-3xl font-bold">
            <h2> Recent Posts </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
