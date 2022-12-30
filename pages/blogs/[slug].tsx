import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Link from "next/link";

const Blog = (props: any) => {
  const router = useRouter();
  console.log(props);

  return (
    <Layout>
      <>
        <Link className="font-bold" href="/blogs"> 
        <a className="text-md text-gray-500 pb-4">Back to blogs </a>
       </Link>

        <div className="prose mx-auto dark:prose-invert">
          <h1 className="dark:text-white">{props.frontmatter.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: md().render(props.content) }}
          />
        </div>
      </>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Retrieve all our slugs
  const files = fs.readdirSync("content/blog/");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`content/blog/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default Blog;
