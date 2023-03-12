import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Post from "../shared/Post";

const Home: NextPage = () => {
  
 

  return (
    <Layout>
      <div>
        <div className="flex flex-col pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text mr-4">
            Karthikeyan
          </h1>
          <h2 className="mb-4 pt-1 text-lg  tracking-wide">
            Developer | Gamer | Technical Writer
          </h2>
          <p className="text-gray-600  mb-16 dark:text-slate-300">
            I am a software developer who loves to solve problems using code and
            to share knowledge by writing technical blogs.
          </p>
        </div>
        <div>
          
           
        </div>
      </div>
    </Layout>
  );
};

export default Home;
