import React from 'react';
import Image from 'next/image';
import ProfilePicture from '@assets/images/ProfilePicture.JPEG';
import useWindowSize from '@hooks/useWindowSize';

const About = () => {
  const size = useWindowSize();
  return (
    <section className="flex justify-center items-center flex-row gap-12">
      <div>
        <div className="shadow-2xl w-[300px]">
          {/* <img src={avatar} alt="Jose Gabriel's Face" /> */}
          {/* <Image src={ProfilePicture} width={size.width * 0.25} height={size.height * 0.5} alt="Jose Gabriel's Cartoon Picture" /> */}
          <Image src={ProfilePicture} width="100%" height="100%" layout="responsive" objectFit="contain" alt="Jose Gabriel's Cartoon Picture" />
        </div>
      </div>

      <div>
        <h1>About</h1>
      </div>
    </section>
  );
};

export default About;
