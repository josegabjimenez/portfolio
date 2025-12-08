import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { RiArrowRightLine, RiDownloadLine } from 'react-icons/ri';
import { SEO } from '@components/index';

gsap.registerPlugin(ScrollTrigger);

const roles = ['Full-Stack Developer', 'Frontend Developer', 'Web Developer', 'React Developer', 'Systems Engineer'];

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  const [displayedRole, setDisplayedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 50 : 2000;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayedRole.length < currentRole.length) {
            setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
          } else {
            // Finished typing, pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (displayedRole.length > 0) {
            setDisplayedRole(displayedRole.slice(0, -1));
          } else {
            // Finished deleting, move to next role
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      displayedRole.length === currentRole.length && !isDeleting ? pauseTime : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayedRole, roleIndex, isDeleting]);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(roleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(descriptionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(ctaRef.current?.children || [], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Jose Gabriel Jiménez | Full-Stack Developer"
        description="Experienced Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable web and mobile applications that deliver exceptional user experiences and business impact."
        keywords="Jose Gabriel Jimenez, Full-Stack Developer, Web Developer, React Developer, Frontend Developer, Backend Developer, Next.js Developer, Node.js, JavaScript, TypeScript, React Native, Portfolio, josegabjimenez, josegabjimenez.dev, Systems Engineer"
        url="https://josegabjimenez.dev"
        type="website"
      />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Jose Gabriel Jiménez',
            alternateName: 'Jose Gabriel Jimenez Vidales',
            url: 'https://josegabjimenez.dev',
            image: 'https://josegabjimenez.dev/og-image.png',
            jobTitle: 'Full-Stack Developer',
            worksFor: {
              '@type': 'Organization',
              name: 'Team International',
            },
            description: 'Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable web and mobile applications.',
            knowsAbout: ['React', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript', 'React Native', 'HTML', 'CSS', 'Tailwind CSS', 'Web Development', 'Mobile Development', 'Full-Stack Development'],
            sameAs: ['https://github.com/josegabjimenez', 'https://linkedin.com/in/josegabjimenez', 'https://twitter.com/josegabjimenez'],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'MX',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-[calc(100vh-10rem)] flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Intro Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 text-sm text-white/70">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for new opportunities
          </div>

          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight">
            Hi, I&apos;m <span className="hero-title-accent text-glow">Jose Gabriel Jiménez</span>
          </h1>

          {/* Typewriter Role */}
          <div ref={roleRef} className="mb-12">
            <span className="font-mono text-lg sm:text-xl md:text-2xl text-white/70 tracking-wide inline-flex items-center">
              <span className="text-primary/50 mr-3 opacity-70">~/</span>
              <span className="text-white/90">{displayedRole}</span>
              <span className="w-[2px] h-[1.2em] bg-primary/80 ml-1 self-center" style={{ animation: 'blink 0.8s step-end infinite' }} />
            </span>
          </div>

          {/* Description */}
          <p ref={descriptionRef} className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Full-Stack Developer with a frontend focus. I craft user-centric applications that deliver real business impact.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio">
              <button className="primary-button px-8 py-4 rounded-full font-semibold flex items-center gap-2 group">
                View My Work
                <RiArrowRightLine className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">
              <button className="glass-button px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:text-primary transition-colors">
                <RiDownloadLine className="w-5 h-5" />
                Download CV
              </button>
            </a>
            <Link href="/contact">
              <button className="glass-button px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:text-primary transition-colors">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Let&apos;s Talk
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
