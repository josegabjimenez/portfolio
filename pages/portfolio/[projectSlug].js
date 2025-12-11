import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@components/index';
import { Splide, SplideSlide } from '@splidejs/react-splide';

// API
import { getProject } from '@pages/api/projects/[projectSlug]';
import { getProjects } from '@pages/api/projects/index';

// Icons
import { MdOutlineArrowBack } from 'react-icons/md';
import { RiGithubFill, RiExternalLinkLine } from 'react-icons/ri';
import '@splidejs/react-splide/css';

const Project = ({ project }) => {
  const [maxSlideHeight, setMaxSlideHeight] = useState(0);
  const carouselRef = useRef(null);
  const contentRef = useRef(null);

  const recalcMaxSlideHeight = useCallback(() => {
    if (!carouselRef.current) return;
    const imgs = carouselRef.current.querySelectorAll('img');
    let max = 0;
    imgs.forEach((img) => {
      if (img.complete) {
        max = Math.max(max, img.clientHeight);
      }
    });
    if (max > 0) setMaxSlideHeight(max);
  }, []);

  useEffect(() => {
    const onResize = () => recalcMaxSlideHeight();
    window.addEventListener('resize', onResize);
    const id = setTimeout(recalcMaxSlideHeight, 100);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(id);
    };
  }, [recalcMaxSlideHeight]);

  // Animate content sections on mount
  useEffect(() => {
    if (!contentRef.current) return;
    const sections = contentRef.current.querySelectorAll('.project-glass-section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(40px)';
      setTimeout(() => {
        section.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 400 + index * 150);
    });
  }, []);

  return (
    <main className="flex flex-col w-full min-h-screen">
      <Head>
        <title>{project.title} | Jose Gabriel Jimenez</title>
        <meta name="description" content={project.description?.slice(0, 160) || `${project.title} project page`} />
      </Head>

      {/* Back Button - Fixed position */}
      <Link href="/portfolio" className="project-back-btn">
        <MdOutlineArrowBack className="text-xl" />
        <span>Back</span>
      </Link>

      {/* Hero Section */}
      <Hero data={project} />

      {/* Content Section */}
      <div className="project-content mx-auto" ref={contentRef}>
        {/* Description & Actions Card */}
        <section className="project-glass-section">
          <p className="project-description">{project.description}</p>

          {/* Action Buttons */}
          <div className="project-actions">
            {project.github_link && !project.is_private && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noreferrer"
                className="project-btn project-btn-glass"
              >
                <RiGithubFill className="project-btn-icon" />
                <span>View Source Code</span>
              </a>
            )}

            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                rel="noreferrer"
                className="project-btn project-btn-primary"
              >
                <RiExternalLinkLine className="project-btn-icon" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </section>

        {/* Technologies Card */}
        <section className="project-glass-section">
          <h2 className="project-section-title">Technologies Used</h2>
          <div className="project-tech-grid">
            {project.technologies.map((tech) => (
              <div
                key={`${project.title}-tech-${tech.name}`}
                className="project-tech-badge"
              >
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    fill
                    className="project-tech-icon object-contain"
                  />
                </div>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Card */}
        {project.images && project.images.length > 0 && (
          <section className="project-glass-section">
            <h2 className="project-section-title">Project Gallery</h2>
            <div className="project-gallery" ref={carouselRef}>
              <Splide
                aria-label={`${project.title} Gallery`}
                options={{
                  rewind: true,
                  gap: '1rem',
                  padding: { left: 0, right: 0 },
                  pagination: true,
                  arrows: project.images.length > 1,
                }}
              >
                {project.images.map((image, index) => (
                  <SplideSlide key={`${project.title}-image-${index + 1}`}>
                    <div
                      className="project-gallery-slide"
                      style={{
                        height: maxSlideHeight ? `${maxSlideHeight}px` : '400px',
                        minHeight: '300px',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        onLoad={recalcMaxSlideHeight}
                        className="project-gallery-image"
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </section>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-20 md:h-8" />
    </main>
  );
};

export const getStaticPaths = async () => {
  const projects = await getProjects();
  const paths = projects.map((project) => ({
    params: {
      projectSlug: project.slug,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const { projectSlug } = params;
  const project = await getProject(projectSlug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
    revalidate: 60,
  };
};

export default Project;
