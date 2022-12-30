import matter from "gray-matter";
import Layout from "../../components/Layout";
import fs from "fs";
import Link from "next/link";

const Blogs = (props: any) => {
  console.log(props);
  return (
    <Layout>
      <div>
      <h2 className="text-3xl font-bold pb-12"> Blog Posts </h2>
      {props.posts.map((post:any, index:number) => {
        return (
          <Link className="w-full" href={`/blogs/${post.slug}`} key={index}>
            <div className="w-full mb-8">
              <div className="flex flex-col justify-between md:flex-row">
                <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
                  {post.frontmatter.title}
                </h4>
                {/* <p className="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">
                  0
                </p> */}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {post.frontmatter.metaDesc}
              </p>
            </div>
          </Link>
        );
      })}
      </div>
   
    </Layout>
  );
};

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync("content/blog/");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blogs;
