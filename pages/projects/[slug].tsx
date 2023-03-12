import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Link from "next/link";

const Project = (props: any) => {
  return (
    <Layout>
      <>
        <Link className="font-bold" href="/projects">
          <a className="text-md text-gray-500 pb-4">Back to Site </a>
        </Link>

        <div className="prose mx-auto dark:prose-invert">
          <h1 className="dark:text-white capitalize">
            {props.frontmatter.title}
          </h1>
          <Link href={props.frontmatter.liveUrl}>
           
            <a target="_blank" className="w-full block no-underline text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg  text-center text-lg capitalize tracking-wide px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              
              Live Url
            </a>
          </Link>

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
  const files = fs.readdirSync("content/projects/");

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
  const fileName = fs.readFileSync(`content/projects/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default Project;
