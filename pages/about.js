import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import ProfilePicture from '@assets/images/ProfilePicture.JPEG';

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
        <meta name="description" content="About me page" />
      </Head>

      {/* Profile Photo */}
      <section style={{ minWidth: '200px' }} className="w-[300px] sm:w-[200px] lg:w-[300px] rounded-full bg-red-500 overflow-hidden">
        <Image src={ProfilePicture} width="100%" height="100%" layout="responsive" objectFit="cover" alt="Jose Gabriel's Cartoon Picture" />
      </section>

      {/* About me text */}
      <section className="max-w-screen-sm sm:text-left text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">About</h1>
        <p className="text-md md:text-lg lg:text-xl mt-2">
          I'm a tech and software enthusiast deeply passionate about coding 💻, with expertise in web and mobile app development 📱. Alongside my love for technology, I prioritize a healthy lifestyle
          💪🏽 and regularly engage in exercise and outdoor activities. As I fuel my creativity and zest for life with a cup of coffee ☕, I'm committed to continuous growth and innovation in the
          ever-evolving tech world.
        </p>
        {/* Skills images */}
        <p className="font-bold text-md mt-8">Skills</p>
        <div className="flex gap-4 mb-8 mt-2 justify-center sm:justify-start flex-wrap">
          {skills.map((skill) => {
            if (skill.id != 'React_tec') {
              return (
                <div key={skill.id} style={{ backgroundColor: skill.bg_color }} className={`rounded-md w-10 lg:w-12 flex justify-center items-center p-1`}>
                  <Image width="100%" height="100%" src={skill.image} alt={`${skill.name} technology`} />
                </div>
              );
            }
          })}
        </div>
      </section>
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
