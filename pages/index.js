import { useRef, useEffect } from 'react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HiOutlineCode, HiOutlineSparkles, HiOutlineCube } from 'react-icons/hi';
import { RiArrowRightLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  const services = [
    {
      icon: <HiOutlineSparkles className="w-5 h-5" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user experiences',
    },
    {
      icon: <HiOutlineCode className="w-5 h-5" />,
      title: 'Frontend Development',
      description: 'Building responsive and performant web applications',
    },
    {
      icon: <HiOutlineCube className="w-5 h-5" />,
      title: 'Full-Stack Solutions',
      description: 'End-to-end development with modern technologies',
    },
  ];

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Main content animation
      tl.fromTo(titleRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(subtitleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(descriptionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(servicesRef.current?.children || [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .fromTo(ctaRef.current?.children || [], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>Jose Gabriel Jiménez | Full-Stack Developer</title>
        <meta name="description" content="Full-Stack Developer specializing in creating beautiful digital experiences. Bridging the gap between design and development." />
        <link rel="icon" href="/coding.png" />
      </Head>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-[calc(100vh-10rem)] flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4">
            Design & <span className="hero-title-italic text-gradient">Develop</span>
          </h1>
          <h2 ref={subtitleRef} className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/90 mb-8">
            Together.
          </h2>

          {/* Description */}
          <p ref={descriptionRef} className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Bridging the gap between beautiful design and powerful development. I create digital experiences that look stunning and perform flawlessly.
          </p>

          {/* Service Cards */}
          <div ref={servicesRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {services.map((service) => (
              <div key={service.title} className="service-card glass-card px-6 py-4 flex items-center gap-3 w-full sm:w-auto">
                <span className="text-primary">{service.icon}</span>
                <span className="text-white/80 text-sm font-medium">{service.title}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio">
              <button className="primary-button px-8 py-4 rounded-full font-semibold flex items-center gap-2 group">
                View Portfolio
                <RiArrowRightLine className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="glass-button px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:text-primary transition-colors">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Let&apos;s Connect
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
