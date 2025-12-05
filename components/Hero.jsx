import React from 'react';

const Hero = ({ data }) => {
  return (
    <section className="hero overflow-hidden absolute top-0 left-0 right-0 z-0 h-[50vh] w-full -mt-[5rem]">
      <img className="w-full h-full object-cover absolute inset-0 blur-sm" src={data.images[0]} alt="Project Background" />
      <div className="hero-overlay bg-black/70 absolute inset-0" />
      <div className="hero-content text-center relative z-10 h-full flex items-center justify-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-black italic text-white">{data.title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
