import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Card = ({ project }) => {
  return (
    <Link href={`/portfolio/${project.slug}`}>
      <div className="z-0 card w-80 transition-all cursor-pointer opacity-60 hover:opacity-100 shadow-xl border-2 border-base-100 hover:border-primary">
        <figure>
          <img className="max-h-80" src={project.images[0] ? project.images[0] : 'https://api.lorem.space/image/shoes'} alt="Shoes" />
          {/* <div className="max-h-80"><Image width="100%" height="100%" src={project.images[0] ? project.images[0] : 'https://api.lorem.space/image/shoes'} alt="Shoes" /></div> */}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{project.title}</h2>
          <div className="flex">
            {project.technologies.map((technology) => (
              <div key={`${project.title}-tech-${technology.name}-preview`} className="w-8 h-8 object-cover rounded-md overflow-hidden">
                <Image width="100%" height="100%" className="w-full" src={technology.image} alt={`${technology.name} used`} />
              </div>
            ))}
          </div>
          {/* <p>{project.description}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
