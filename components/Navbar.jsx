import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { RiDownloadCloudLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pillRef = useRef(null);
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

  // Close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobileMenuOpen]);

  // Entry animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(pillRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.4')
      .fromTo(linksRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.3')
      .fromTo(ctaRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3');
  }, []);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
        {/* Pill Container */}
        <div ref={pillRef} className={`navbar-pill max-w-4xl mx-auto transition-all duration-500 ${isScrolled ? 'navbar-pill-scrolled' : ''}`}>
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            {/* Logo */}
            <Link href="/">
              <div ref={logoRef} className="flex items-center cursor-pointer group">
                <span className="font-semibold text-lg text-white group-hover:text-white/90 transition-colors">
                  josegab<span className="text-primary">jimenez</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8">
              {routes.map((route, index) => (
                <li key={route.path}>
                  <Link href={route.path}>
                    <span ref={(el) => (linksRef.current[index] = el)} className="nav-link-pill text-sm text-white/60 hover:text-white cursor-pointer transition-colors duration-300">
                      {route.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <div ref={ctaRef} className="hidden md:block">
              <a href="/CV.pdf" target="_blank" download="CV.pdf">
                <button className="navbar-cta-button px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2">
                  <RiDownloadCloudLine className="w-4 h-4" />
                  Download CV
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenuLine className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fixed position overlay */}
        <div className={`md:hidden fixed inset-x-0 top-[72px] transition-all duration-300 px-4 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="mobile-menu-container max-w-4xl mx-auto rounded-2xl overflow-hidden">
            <div className="px-6 py-6 space-y-2">
              {routes.map((route) => (
                <Link href={route.path} key={route.path}>
                  <p className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                    {route.name}
                  </p>
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a href="/CV.pdf" target="_blank" download="CV.pdf">
                  <button
                    className="navbar-cta-button w-full py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <RiDownloadCloudLine className="w-4 h-4" />
                    Download CV
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu backdrop */}
        <div
          className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 -z-10 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
