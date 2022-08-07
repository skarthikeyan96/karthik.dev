import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Post from "../shared/Post";
import { fetchBlogPost, renderLoader } from "./blog";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [recentPosts, setRecentPost] = useState<Array<Post>>();

  const getRecentPosts = async () => {
    setLoading(true);
    const posts = await fetchBlogPost();
    let recent = [];

    for (let i = 0; i < 5; i++) {
      recent.push(posts[i]);
    }

    setRecentPost(recent);
    setLoading(false);
  };

  useEffect(() => {
    getRecentPosts();
  }, []);

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
          <p className="text-gray-600  mb-16">
            I am a software developer who loves to solve problems using code and
            to share knowledge by writing technical blogs.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold"> Recent Posts </h2>
          {loading ? (
            renderLoader()
          ) : (
            <div className="pt-4">
              {recentPosts?.map((post: Post, index: number) => {
                return (
                  <div key={index} className="pb-8">
                  <Post
                    id={index}
                    title={post.title}
                    description={post.description}
                    url={post.url}
                    created_at={post.created_at}
                  /></div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
