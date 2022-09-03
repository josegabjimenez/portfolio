import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import { Card } from '@components/index';

// Animations
import { gsap } from "gsap";

// API
// import endPoints from '@services/endPoints';
import { getProjects } from '@pages/api/projects/index';

const Portfolio = ({ projects }) => {

  const sectionRef = useRef(null);

  useEffect(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <main ref={sectionRef} className="flex flex-col justify-center items-center my-12">
      <Head>
        <title>My projects 🔨</title>
        <meta name="description" content="All my projects" />
      </Head>
      <h1 className="text-5xl sm:text-7xl mb-8 font-extrabold">Projects 🔨</h1>
      {/* <section className="grid grid-flow-col auto-cols-max gap-4 w-4/5 "> */}
      <section className="flex flex-wrap justify-center gap-4 w-4/5 ">
        {/* {console.log(projects)} */}
        {projects.map((project) => (
          <div key={project.title}>
            <Card project={project} />
          </div>
        ))}
      </section>
    </main>
  );
};

export const getStaticProps = async () => {
  try {
    const projects = await getProjects();
    // const res = await fetch(endPoints.projects.getAll);
    // const { projects } = await res.json();
    return {
      props: {
        projects: JSON.parse(JSON.stringify(projects)),
      }, // will be passed to the page component as props
      revalidate: 60,
    };
  } catch (err) {
    console.log(err);
  }
};

export default Portfolio;
