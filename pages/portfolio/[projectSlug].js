import React from 'react';
import endPoints from '@services/endPoints';

const Project = ({ project }) => {
  return (
    <div>
      <h1>Project</h1>
      <p>{project.title}</p>
    </div>
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
