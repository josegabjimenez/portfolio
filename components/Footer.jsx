import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 mt-20">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Email */}
          <a
            href="mailto:josegabojimenez@gmail.com"
            className="text-white/60 hover:text-primary transition-colors text-sm"
          >
            josegabojimenez@gmail.com
          </a>

          {/* Tagline */}
          <p className="text-white/40 text-sm text-center">
            Full-Stack Developer. From Colombia with ❤️
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs">
            © {year} Jose Gabriel Jiménez. Crafted with passion & code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
