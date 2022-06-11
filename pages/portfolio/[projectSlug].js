import React from 'react';
import endPoints from '@services/endPoints';

const Project = ({ project }) => {
  return (
    <main className="flex flex-col justify-center items-center">
      <section className="hero h-80 shadow-[inset_0_0_15px_2px_rgba(0,0,0,0.3)]" style={{ backgroundImage: `url(${project.images[0]})` }}>
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{project.title}</h1>
          </div>
        </div>
      </section>
      <section className="mt-16 w-1/3 text-justify">
        <h1>Project</h1>
        <h1>{project.description}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, assumenda laboriosam ea, beatae excepturi totam hic harum soluta sapiente sit, dicta inventore nesciunt! Animi asperiores
          aperiam saepe, a modi officia.
        </p>
      </section>
      {/* <p>{project.title}</p> */}
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
