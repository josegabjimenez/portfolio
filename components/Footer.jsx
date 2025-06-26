import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const links = {
    github: 'https://github.com/josegabjimenez',
    linkedin: 'https://www.linkedin.com/in/josegabjimenez',
    email: 'mailto:josegabojimenez@gmail.com',
  };
  return (
    <footer className="">
      <section className="flex justify-center text-4xl gap-6">
        <a className="transition-colors hover:text-primary" href={links.github} target="_blank" rel="noreferrer">
          <AiFillGithub />
        </a>
        <a className="transition-colors hover:text-primary" href={links.linkedin} target="_blank" rel="noreferrer">
          <AiFillLinkedin />
        </a>

        <a className="transition-colors hover:text-primary" href={links.email} target="_blank" rel="noreferrer">
          <AiFillMail />
        </a>
      </section>
      <section className="footer footer-center p-4 mt-4 text-base-content">
        <div>
          <p>
            Copyright © {year} - Made with 💓 by{' '}
            <a href={links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary font-bold underline">
              @josegabjimenez
            </a>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
