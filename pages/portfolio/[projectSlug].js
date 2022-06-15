import React from 'react';
import endPoints from '@services/endPoints';
import useWindowSize from '@hooks/useWindowSize';
import { Hero } from '@components/index';

//Icons
import { MdDone } from 'react-icons/md';
import { RiToolsFill, RiGithubFill, RiEyeFill } from 'react-icons/ri';

const Project = ({ project }) => {
  const size = useWindowSize();
  console.log(project);
  return (
    <main className="flex flex-col justify-center items-center">
      <Hero data={project} />
      <section className={`content w-1/3 text-justify mb-8`}>
        {project.is_finished ? (
          <div className="badge badge-success">
            <MdDone className="mr-1" /> Done
          </div>
        ) : (
          <div className="badge badge-warning">
            <RiToolsFill className="mr-1" />
            Working
          </div>
        )}
        <div className="mt-8">
          <p className="text-justify">{project.description}</p>

          {/* Source Code button */}
          {project.github_link && !project.is_private && (
            <a className="" href={project.github_link} target="_blank" rel="noreferrer">
              <div className="btn btn-outline btn-secondary flex items-center gap-2 mt-2">
                <RiGithubFill />
                Source Code
              </div>
            </a>
          )}
          {/* Live Version button */}
          {project.project_link && (
            <a className="" href={project.project_link} target="_blank" rel="noreferrer">
              <div className="btn btn-outline btn-accent flex items-center gap-2 mt-2">
                <RiEyeFill />
                Live Version
              </div>
            </a>
          )}

          {/* Technologies */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold">Technologies</h3>
            <ul className="list-disc list-inside">
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Some styles in JSX */}
      <style jsx>
        {`
          .content {
            margin-top: ${Math.floor(size.height * 0.45)}px;
            min-height: ${Math.floor(size.height * 0.3)}px;
          }
        `}
      </style>
    </main>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(endPoints.projects.getAll);
  const data = await res.json();

  const paths = data.projects.map((project) => {
    return {
      params: {
        projectSlug: project.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { projectSlug } = params;
  const res = await fetch(endPoints.projects.get(projectSlug));
  const { project } = await res.json();
  return {
    props: {
      project,
    },
  };
};

export default Project;
