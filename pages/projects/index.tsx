import matter from "gray-matter";
import Layout from "../../components/Layout";
import fs from "fs";
import Post from "../../shared/Post";
import Link from "next/link";

const Projects = (props: any) => {

  return (
    <Layout>
      <div>
        <h2 className="pb-12 font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text mr-4">

          Side Projects
        </h2>
        {
            props.projects.map((project:any, index: number) => {
                const {slug, title, description} = project.frontmatter
                return(
                    <Link className="w-full" href={`/projects/${slug}`} key={index}>
                    <div className="w-full mb-8 cursor-pointer">
                      <div className="flex flex-col justify-between md:flex-row">
                        <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100 capitalize tracking-wider">
                          {title}
                        </h4>
                       
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {description}
                      </p>
                    </div>
                  </Link>
                )
            })
        }
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Get all our projects
  const files = fs.readdirSync("content/projects/");

  const projects = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`content/projects/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  projects.sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1 );


  return {
    props: {
      projects,
    },
  };
}

export default Projects;