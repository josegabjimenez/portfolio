import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MdDone } from 'react-icons/md';
import { RiToolsFill } from 'react-icons/ri';

const Hero = ({ data }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation on mount
    const hero = heroRef.current;
    const title = titleRef.current;
    const badge = badgeRef.current;

    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'scale(1.02)';
      requestAnimationFrame(() => {
        hero.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        hero.style.opacity = '1';
        hero.style.transform = 'scale(1)';
      });
    }

    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(30px)';
      setTimeout(() => {
        title.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 300);
    }

    if (badge) {
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(20px)';
      setTimeout(() => {
        badge.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
      }, 500);
    }
  }, []);

  return (
    <section className="project-hero" ref={heroRef}>
      {/* Background Image with blur */}
      <Image
        className="project-hero-bg"
        src={data.images[0]}
        alt={`${data.title} Background`}
        fill
        priority
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="project-hero-overlay" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, var(--primary-glow) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="project-hero-content">
        <h1 ref={titleRef} className="project-title">
          {data.title}
        </h1>

        {/* Status Badge */}
        <div ref={badgeRef}>
          {data.is_finished ? (
            <div className="project-status project-status-done">
              <MdDone className="text-lg" />
              <span>Completed</span>
            </div>
          ) : (
            <div className="project-status project-status-working">
              <RiToolsFill className="text-lg" />
              <span>In Progress</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
