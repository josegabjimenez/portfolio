import React from 'react';
import endPoints from '@services/endPoints';
import { Card } from '@components/index';

const Portfolio = ({ projects }) => {
  return (
    <main className="flex flex-col justify-center items-center my-8">
      <h1 className="font-bold text-4xl mb-8">Projects 🔨</h1>
      <section className="grid grid-flow-col auto-cols-max gap-4 w-4/5 ">
        {/* {console.log(projects)} */}
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
};

export async function getStaticProps() {
  const res = await fetch(endPoints.projects.get);
  const { projects } = await res.json();
  return {
    props: {
      projects,
    }, // will be passed to the page component as props
  };
}

export default Portfolio;
