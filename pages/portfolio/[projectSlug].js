import React from 'react';
import endPoints from '@services/endPoints';
import useWindowSize from '@hooks/useWindowSize';
import { Hero } from '@components/index';

//Icons
import { MdDone } from 'react-icons/md';
import { RiToolsFill } from 'react-icons/ri';

const Project = ({ project }) => {
  const size = useWindowSize();
  console.log(Math.floor(size.height * 0.5));
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
        <div></div>
        <h1>Project</h1>
        <h1>{project.description}</h1>
      </section>

      {/* Some styles in JSX */}
      <style jsx>
        {`
          .content {
            margin-top: ${Math.floor(size.height * 0.3)}px;
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
