import React from 'react';
import Image from 'next/image';
import ProfilePicture from '@assets/images/ProfilePicture.JPEG';
import useWindowSize from '@hooks/useWindowSize';

const About = () => {
  const size = useWindowSize();
  return (
    <section className="flex justify-center items-center flex-col">
      <div>
        <div>
          {/* <img src={avatar} alt="Jose Gabriel's Face" /> */}
          <Image src={ProfilePicture} width={size.width * 0.25} height={size.height * 0.5} alt="Jose Gabriel's Cartoon Picture" />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default About;
