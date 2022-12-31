import matter from "gray-matter";
import Layout from "../../components/Layout";
import fs from "fs";
import Post from "../../shared/Post";

const Blogs = (props: any) => {
  console.log(props);

  return (
    <Layout>
      <div>
        <h2 className="pb-12 font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text mr-4">
         
          Blog Posts
        </h2>
        {props.posts.map((post: any, index: number) => {
          return (
            <Post
              id={index}
              title={post.frontmatter.title}
              description={post.frontmatter.metaDesc}
              url={post.url}
              created_at={post.frontmatter.date}
              slug={post.slug}
            />
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

  posts.sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1 );


  return {
    props: {
      posts,
    },
  };
}

export default Blogs;
