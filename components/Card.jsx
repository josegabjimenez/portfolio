import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Icons
import { MdDone } from 'react-icons/md';
import { RiToolsFill } from 'react-icons/ri';

const Card = ({ project }) => {
  return (
    <Link href={`/portfolio/${project.slug}`}>
      <div className="z-0 card w-80 transition-all cursor-pointer opacity-60 hover:opacity-100 shadow-xl border-2 border-base-100 hover:border-primary">
        <figure>
          <img className="max-h-80" src={project.images[0] ? project.images[0] : 'https://api.lorem.space/image/shoes'} alt="Shoes" />
          {/* <div className="max-h-80"><Image width="100%" height="100%" src={project.images[0] ? project.images[0] : 'https://api.lorem.space/image/shoes'} alt="Shoes" /></div> */}
        </figure>
        <div className="card-body">
          <div className="flex justify-between items-end w-full">
            <div>
              <h2 className="card-title">{project.title}</h2>
            </div>
            {project.is_finished ? (
              <div className="badge badge-success">
                <MdDone />
              </div>
            ) : (
              <div className="badge badge-warning">
                <RiToolsFill />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {project.technologies.map((technology) => (
              <div key={`${project.title}-tech-${technology.name}-preview`} className="relative w-6 h-6 rounded-md">
                <Image src={technology.image} fill alt={`${technology.name} used`} className="object-contain" />
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
