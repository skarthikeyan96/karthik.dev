import { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Post from "../shared/Post";

export const fetchBlogPost = async () => {
  let response = await fetch(
    `https://dev.to/api/articles?username=imkarthikeyan`
  );
  let posts = await response.json();
  return posts;
};

export const renderLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

const Blog: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [posts, setPost] = useState<Array<Post>>();

  const fetchAndStoreBlogPosts = async () => {
    setLoading(true);
    const posts = await fetchBlogPost();
    setPost(posts);
    localStorage.setItem("posts", JSON.stringify(posts));
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("posts")) {
      const results = localStorage.getItem("posts") as string;
      setPost(JSON.parse(results));
    }
    fetchAndStoreBlogPosts();
  }, []);

  return (
    <Layout>
      {loading ? (
        renderLoader()
      ) : (
        <div>
          <h2 className="text-3xl font-bold"> Blog Posts </h2>
          <div className="pt-12">
            {posts?.map((post: Post, index: number) => {
              return (
                <div key={index} className="pb-8">

                <Post
                  id={index}
                  title={post.title}
                  description={post.description}
                  url={post.url}
                  created_at={post.created_at}
                />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Blog;
