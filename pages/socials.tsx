import Image from "next/image";
import Layout from "../components/Layout";
import links from "../content/links.json";
import Link from "next/link";

const Socials = () => {
  return (
    <div className="h-screen text-white bg-[url('https://user-images.githubusercontent.com/23126394/212474186-26955ec8-07ee-4cb3-887a-dd8b64a96efc.png')]">
      <div className="flex justify-end pt-4 mr-8 text-slate-400">
        <Link href="/">
          Back to site
        </Link>
      </div>

      <div className="flex items-center flex-col mx-auto w-full justify-center px-8 py-12">
        <Image
          className="rounded-full pt-16"
          src={links.avatar}
          width={100}
          height={100}
        />
        <h1 className="font-bold pt-4 pb-8 "> {links.name} </h1>
        {links.links.map((link: any, index: number) => {
          return (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 w-full rounded-md hover:scale-105 transition-all mb-6 max-w-3xl border border-black bg-white text-black"
            >
              <div className="flex text-center w-full">
                <h2 className="flex justify-center items-center font-semibold w-full ">
                  {link.title}
                </h2>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Socials;
