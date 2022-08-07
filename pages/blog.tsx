import { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Blog: NextPage = () => {
  const [posts, setPost] = useState<Array<any>>();

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
    return posts?.map((post) => {
      const { title, description, url } = post;
      return (
        <div className="mb-4" key={post.id}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            <h3 className="w-full text-lg font-medium "> {title} </h3>
            <p className="text-gray-600 "> {description} </p>
          </a>
        </div>
      );
    });
  };

  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-bold"> Blog Posts </h2>
        <div className="pt-4">{renderPost()}</div>
      </div>
    </Layout>
  );
};

export default Blog;
