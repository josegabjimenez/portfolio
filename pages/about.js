import React from 'react';
import Image from 'next/image';
import ProfilePicture from '@assets/images/ProfilePicture.JPEG';
// import useWindowSize from '@hooks/useWindowSize';
import endPoints from '@services/endPoints';

const About = ({ skills }) => {
  // const size = useWindowSize();
  return (
    <section className="sm:flex-row flex-col flex justify-center items-center gap-12">
      <div>
        <div className="w-[300px]">
          {/* <img src={avatar} alt="Jose Gabriel's Face" /> */}
          {/* <Image src={ProfilePicture} width={size.width * 0.25} height={size.height * 0.5} alt="Jose Gabriel's Cartoon Picture" /> */}
          <Image src={ProfilePicture} width="100%" height="100%" layout="responsive" objectFit="contain" alt="Jose Gabriel's Cartoon Picture" />
        </div>
      </div>

      <div className="max-w-screen-sm ">
        <h1 className="text-7xl">About</h1>
        <p className="text-xl mt-8">I&apos;m a tech and software enthusiast, who loves to code 💻, do web development, do exercise 💪🏽, and drink coffee ☕</p>
        {/* Skills images */}
        <div className="flex gap-4 mt-8 justify-center sm:justify-start">
          {skills.map((skill) => (
            <div key={skill.id} style={{ backgroundColor: skill.bg_color }} className={`rounded-md w-12 flex justify-center items-center p-1`}>
              <Image width="100%" height="100%" src={skill.image} alt={`${skill.name} technology`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Page props
export const getStaticProps = async () => {
  const res = await fetch(endPoints.skills.getAll);
  const { skills } = await res.json();
  return {
    props: {
      skills,
    },
  };
};

export default About;
