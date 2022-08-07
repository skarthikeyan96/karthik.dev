import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
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
        <div>
          <h2 className="text-3xl font-bold"> Recent Posts </h2>
          <div className="pt-4"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
