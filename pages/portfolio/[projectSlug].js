import React from 'react';
import endPoints from '@services/endPoints';
import useWindowSize from '@hooks/useWindowSize';
import { Hero } from '@components/index';

//Icons
import { MdDone } from 'react-icons/md';
import { RiToolsFill, RiGithubFill, RiEyeFill } from 'react-icons/ri';
//Carousel CSS
import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";

const Project = ({ project }) => {
  const size = useWindowSize();
  // console.log(project);
  return (
    <main className="flex flex-col justify-center items-center">
      <Hero data={project} />
      <section className={`content w-11/12 lg:w-1/2 xl:w-1/3 text-justify mb-8`}>
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

          <h3 className="text-2xl font-bold mt-8">Technologies used</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {project.technologies.map((tech) => (
              <>
                <div key={tech.name} className="relative bg-base-content text-base-100 pr-2 mt-5 rounded-md min-w-max">
                  <div style={{ backgroundColor: tech.bg_color }} className="flex justify-center items-center absolute -left-2 -top-3 h-12 w-12 rounded-md">
                    <img className="w-11/12 object-cover h-11/12" src={tech.image} alt={`${tech.name} technology`} />
                  </div>
                  <p className="ml-12">{tech.name}</p>
                </div>
              </>
            ))}
          </div>

          {/* Images carousel */}
          <h3 className="text-2xl font-bold mt-8">Some images</h3>

   
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
