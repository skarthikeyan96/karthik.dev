import { NextPage } from "next";
import Layout from "../components/Layout";
import projects from "../content/projects.json";
import Post from "../shared/Post";

const Projects: NextPage = () => {
  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-bold mb-12"> Projects </h2>
        <div className="mb-4">
          {projects?.map((project, index) => {
            return (
                <div key={index} className="pb-8">

              <Post
                id={index}
                title={project.title}
                description={project.description}
                url={project.url}
              />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
