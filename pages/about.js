import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ProfilePicture from '@assets/images/Photo.jpg';

// Animations
import { gsap } from 'gsap';

// API
import { getSkills } from '@pages/api/skills/index';

const About = ({ skills }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <section ref={sectionRef} className="sm:flex-row flex-col flex justify-center items-center gap-12 px-2">
      {/* Metadata */}
      <Head>
        <title>About me ☕</title>
        <meta name="description" content="About me page, this page includes information about @josegabjimenez, @josegab.dev, Jose Gabriel Jiménez Vidales" />
      </Head>

      {/* Profile Photo */}
      <section style={{ minWidth: '200px' }} className="relative w-[300px] h-[300px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden">
        <Image src={ProfilePicture} fill alt="Jose Gabriel Jiménez's Picture" className="object-cover" />
      </section>

      {/* About me text */}
      <article className="max-w-screen-sm sm:text-left text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">About</h1>
        <p className="text-md md:text-lg lg:text-xl mt-2">
          I&apos;m a tech and software enthusiast deeply passionate about coding 💻, with expertise in web and mobile app development 📱. Alongside my love for technology, I prioritize a healthy
          lifestyle 💪🏽 and regularly engage in exercise and outdoor activities. As I fuel my creativity and zest for life with a cup of coffee ☕, I&apos;m committed to continuous growth and
          innovation in the ever-evolving tech world.
        </p>
        {/* Skills images */}
        <p className="font-bold text-md mt-8">Skills</p>
        <div className="flex gap-4 mb-8 mt-2 justify-center sm:justify-start flex-wrap">
          {skills.map((skill) => {
            if (skill.id != 'React_tec') {
              return (
                <div key={skill.id} style={{ backgroundColor: skill.bg_color }} className={`relative rounded-md w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center`}>
                  <Image src={skill.image} fill alt={`${skill.name} technology`} className="p-1 object-contain" />
                </div>
              );
            }
          })}
        </div>
      </article>
    </section>
  );
};

// Page props
export const getStaticProps = async () => {
  const skills = await getSkills();
  return {
    props: {
      skills,
    },
  };
};

export default About;
