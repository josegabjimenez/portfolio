import React from 'react';
import Link from 'next/link';

const Card = ({ project }) => {
  return (
    <Link href={`/portfolio/${project.slug}`}>
      <div className="card w-80 transition-all cursor-pointer opacity-60 hover:opacity-100 shadow-xl border-2 border-base-100 hover:border-primary">
        <figure>
          <img className="max-h-80" src={project.images[0] ? project.images[0] : 'https://api.lorem.space/image/shoes'} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{project.title}</h2>
          <p>{project.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
