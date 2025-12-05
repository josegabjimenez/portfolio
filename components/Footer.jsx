import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/josegabjimenez',
      icon: <AiFillGithub className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/josegabjimenez',
      icon: <AiFillLinkedin className="w-5 h-5" />,
    },
    {
      name: 'X',
      url: 'https://x.com/josegabjimenez',
      icon: <FaXTwitter className="w-5 h-5" />,
    },
    {
      name: 'Email',
      url: 'mailto:josegabojimenez@gmail.com',
      icon: <AiFillMail className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative z-10">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-center gap-6 py-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary transition-all duration-300 hover:scale-110" aria-label={link.name}>
                {link.icon}
              </a>
            ))}
          </div>

          {/* Email */}
          {/* <a href="mailto:josegabojimenez@gmail.com" className="text-white/60 hover:text-primary transition-colors text-sm">
            josegabojimenez@gmail.com
          </a> */}

          {/* Tagline */}
          {/* <p className="text-white/40 text-sm text-center">Full-Stack Developer. From Colombia with ❤️</p> */}
        </div>

        {/* Bottom Section */}
        <div className="py-4 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs">
            Copyright © {year} - Made with 💓 by{' '}
            <a href={socialLinks[1].url} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary font-bold underline">
              @josegabjimenez
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
