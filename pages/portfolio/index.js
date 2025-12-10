import React, { useRef, useEffect } from 'react';
import { Card, SEO } from '@components/index';

// Animations
import { gsap } from 'gsap';

// API
// import endPoints from '@services/endPoints';
import { getProjects } from '@pages/api/projects/index';

const Portfolio = ({ projects }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate title
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Animate all project cards with stagger on load
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards && cards.length > 0) {
        tl.fromTo(cards, 
          { opacity: 0, y: 40, scale: 0.95 }, 
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6, 
            stagger: 0.08, // Fast stagger for smooth cascade effect
            ease: 'power2.out'
          }, 
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="flex flex-col justify-center items-center my-12">
      <SEO
        title="Portfolio & Projects - Jose Gabriel Jiménez"
        description="Explore Jose Gabriel Jiménez's portfolio featuring innovative web and mobile applications. View projects built with React, Next.js, Node.js, React Native, and modern technologies. Showcasing full-stack development expertise across e-commerce platforms, booking systems, and scalable web solutions."
        keywords="Jose Gabriel Jimenez Portfolio, Web Development Projects, React Projects, Next.js Applications, Full-Stack Projects, Mobile Apps, React Native Projects, JavaScript Portfolio, Web Developer Work, josegabjimenez projects, josegabjimenez.dev portfolio"
        url="https://josegabjimenez.dev/portfolio"
        type="website"
      />
      <h1 ref={titleRef} className="text-5xl sm:text-7xl mb-8 font-extrabold">Projects 🔨</h1>
      {/* <section className="grid grid-flow-col auto-cols-max gap-4 w-4/5 "> */}
      <section ref={cardsRef} className="flex flex-wrap justify-center gap-4 w-4/5 ">
        {/* {console.log(projects)} */}
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <Card project={project} />
          </div>
        ))}
      </section>
    </main>
  );
};

export const getStaticProps = async () => {
  try {
    // Get projects from API
    const projects = await getProjects();

    // Sort projects by rating
    projects.sort((a, b) => b.rating - a.rating);

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
