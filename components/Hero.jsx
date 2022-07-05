import React from 'react';
// import Image from 'next/image';

const Hero = ({ data }) => {
  return (
    <section className="hero overflow-hidden absolute top-0 -z-[1] h-1/2">
      {/* style={{ backgroundImage: `url(${project.images[0]})` }} */}
      {/* <div className="w-full absolute -z-[1] blur-sm">
        <Image width="100%" height="100%" layout="fill" src={data.images[0]} alt="Project Background Image" />
      </div> */}
      <img className="w-full absolute -z-[1] blur-sm" src={data.images[0]} alt="Project Background Image" />
      <div className="hero-overlay bg-opacity-80 " />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{data.title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
