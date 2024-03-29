import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import useWindowSize from '@hooks/useWindowSize';
import { Hero } from '@components/index';
import { Splide, SplideSlide } from '@splidejs/react-splide'; // Carousel

//API
// import endPoints from '@services/endPoints';
import { getProject } from '@pages/api/projects/[projectSlug]';

//Icons
import { MdDone, MdOutlineArrowBack } from 'react-icons/md';
import { RiToolsFill, RiGithubFill, RiEyeFill } from 'react-icons/ri';
import '@splidejs/react-splide/css';
import { getProjects } from '@pages/api/projects/index';

const Project = ({ project }) => {
  const size = useWindowSize();
  // console.log(project);
  return (
    <main className="flex flex-col justify-center items-center">
      <Head>
        <title>{project.title}</title>
        <meta name="description" content={`${project.title} project page`} />
      </Head>
      <Hero data={project} />
      <section className={`content w-11/12 lg:w-1/2 xl:w-1/3 text-justify mb-8`}>
        <div className="flex justify-between items-center">
          <Link href="/portfolio">
            <button className="btn btn-outline btn-primary btn-sm">
              <MdOutlineArrowBack />
              Go back
            </button>
          </Link>

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
        </div>
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
          <div className="flex flex-wrap justify-center mt-8 gap-4">
            {project.technologies.map((tech) => (
              <div key={`${project.title}-tech-${tech.name}`} className="cursor-pointer border-2 border-primary text-base-100 font-bold relative bg-primary  pr-2 mt-5 rounded-md min-w-max">
                <div style={{ backgroundColor: tech.bg_color }} className="flex justify-center items-center absolute -left-2 -top-3 h-12 w-12 rounded-md">
                  <div className="flex justify-center items-center w-11/12 object-cover h-11/12">
                    <Image width="100%" height="100%" className="w-11/12 object-cover h-11/12" src={tech.image} alt={`${tech.name} technology`} />
                  </div>
                  {/* <img className="w-11/12 object-cover h-11/12" src={tech.image} alt={`${tech.name} technology`} /> */}
                </div>
                <p className="ml-12">{tech.name}</p>
              </div>
            ))}
          </div>

          {/* Images carousel */}
          <h3 className="text-2xl font-bold mt-10">Some images</h3>
          <div className="mt-8 text-center">
            <Splide aria-label="My Favorite Images" options={{ rewind: true }}>
              {project.images.map((image, index) => (
                <SplideSlide key={`${project.title}-image-${index + 1}`}>
                  {/* <div className="w-full h-80">
                    <Image width="100%" height="100%" layout="responsive" objectFit="contain" src={image} alt={`Project ${index + 1}`} />
                  </div> */}
                  <img className="max-w-ful h-auto" src={image} alt={`Project ${index + 1}`} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </section>

      {/* Some styles in JSX */}
      <style>
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
  const projects = await getProjects();
  // const res = await fetch(endPoints.projects.getAll);
  // const data = await res.json();

  const paths = projects.map((project) => {
    return {
      params: {
        projectSlug: project.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const { projectSlug } = params;
  const project = await getProject(projectSlug);
  // const res = await fetch(endPoints.projects.get(projectSlug));
  // const { project } = await res.json();
  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
    revalidate: 60, // This will re-generate the page if there is a new request each 60 seconds
  };
};

export default Project;
