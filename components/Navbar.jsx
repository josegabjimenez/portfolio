import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { RiDownloadCloudLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);

  const routes = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/portfolio', name: 'Portfolio' },
    { path: '/contact', name: 'Contact' },
  ];

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entry animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6 }
    )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.4'
      );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-navbar py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div ref={logoRef} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image src="/logo.svg" fill alt="Jose Gabriel Logo" className="object-contain" />
              </div>
              <span className="font-semibold text-lg hidden sm:block">
                Jose<span className="text-primary">Gabriel</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {routes.map((route, index) => (
              <li key={route.path}>
                <Link href={route.path}>
                  <span
                    ref={(el) => (linksRef.current[index] = el)}
                    className="nav-link text-sm font-medium text-white/80 hover:text-white cursor-pointer"
                  >
                    {route.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div ref={ctaRef} className="hidden lg:block">
            <a
              href="/CV.pdf"
              target="_blank"
              download="CV.pdf"
              className="glass-button flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium hover:text-primary transition-colors"
            >
              <RiDownloadCloudLine className="w-4 h-4" />
              Download CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 glass-button rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <RiCloseLine className="w-6 h-6" />
            ) : (
              <RiMenuLine className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 glass-navbar transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {routes.map((route) => (
              <Link href={route.path} key={route.path}>
                <p
                  className="block py-2 text-white/80 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {route.name}
                </p>
              </Link>
            ))}
            <a
              href="/CV.pdf"
              target="_blank"
              download="CV.pdf"
              className="glass-button flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium w-full"
            >
              <RiDownloadCloudLine className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;
