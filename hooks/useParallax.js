import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for parallax scrolling effects
 * Creates smooth parallax animations on elements as user scrolls
 * 
 * @param {Object} options - Parallax configuration
 * @param {number} options.speed - Parallax speed multiplier (0.1 = slow, 1 = normal, 2 = fast)
 * @param {string} options.direction - Direction of parallax ('vertical' | 'horizontal')
 * @param {boolean} options.scrub - Whether to scrub animation with scroll (default: true)
 * @returns {React.RefObject} - Ref to attach to the parallax element
 */
const useParallax = (options = {}) => {
  const elementRef = useRef(null);
  
  const {
    speed = 0.5,
    direction = 'vertical',
    scrub = true,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Calculate movement distance
    const distance = 100 * speed;
    const moveY = direction === 'vertical' ? distance : 0;
    const moveX = direction === 'horizontal' ? distance : 0;

    // Create parallax animation
    const animation = gsap.fromTo(
      element,
      {
        y: -moveY,
        x: -moveX,
      },
      {
        y: moveY,
        x: moveX,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: scrub ? 1 : false,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [speed, direction, scrub, start, end]);

  return elementRef;
};

/**
 * Initialize parallax effects on multiple elements with data attributes
 * Call this once after page load to auto-initialize elements with data-parallax
 */
export const initParallax = () => {
  if (typeof window === 'undefined') return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Find all elements with data-parallax attribute
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  parallaxElements.forEach((element) => {
    const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
    const direction = element.dataset.parallaxDirection || 'vertical';
    
    const distance = 100 * speed;
    const moveY = direction === 'vertical' ? distance : 0;
    const moveX = direction === 'horizontal' ? distance : 0;

    gsap.fromTo(
      element,
      {
        y: -moveY,
        x: -moveX,
      },
      {
        y: moveY,
        x: moveX,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  });
};

/**
 * Create a parallax fade effect - element fades and moves as you scroll
 */
export const useParallaxFade = (options = {}) => {
  const elementRef = useRef(null);
  
  const {
    speed = 0.3,
    fadeStart = 1,
    fadeEnd = 0,
    start = 'top 80%',
    end = 'top 20%',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const distance = 50 * speed;

    const animation = gsap.fromTo(
      element,
      {
        y: distance,
        opacity: fadeStart,
      },
      {
        y: -distance,
        opacity: fadeEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [speed, fadeStart, fadeEnd, start, end]);

  return elementRef;
};

export default useParallax;




