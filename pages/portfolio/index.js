import React from 'react';
import endPoints from '@services/endPoints';
import { Card } from '@components/index';

const Portfolio = ({ projects }) => {
  return (
    <main className="flex flex-col justify-center items-center my-8 ">
      <h1 className="text-7xl mb-8 font-extrabold">Projects 🔨</h1>
      {/* <section className="grid grid-flow-col auto-cols-max gap-4 w-4/5 "> */}
      <section className="flex flex-wrap justify-center gap-4 w-4/5 ">
        {/* {console.log(projects)} */}
        {projects.map((project) => (
          <>
            <div key={project.title}>
              <Card project={project} />
            </div>
            <div key={project.title}>
              <Card project={project} />
            </div>
            <div key={project.title}>
              <Card project={project} />
            </div>
            <div key={project.title}>
              <Card project={project} />
            </div>
            <div key={project.title}>
              <Card project={project} />
            </div>
            <div key={project.title}>
              <Card project={project} />
            </div>
          </>
        ))}
      </section>
    </main>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(endPoints.projects.getAll);
  const { projects } = await res.json();
  return {
    props: {
      projects,
    }, // will be passed to the page component as props
  };
};

export default Portfolio;
