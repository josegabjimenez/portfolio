import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll reveal animations
 * Adds 'in-view' class to elements when they enter the viewport
 *
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin, default '0px 0px -50px 0px'
 * @param {boolean} options.triggerOnce - Only trigger animation once, default true
 * @returns {React.RefObject} - Ref to attach to the container element
 */
const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);

  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find all scroll reveal elements
    const revealElements = container.querySelectorAll('.scroll-reveal, .scroll-fade-up, .scroll-fade-down, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in, .scroll-blur-in, .scroll-fade');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [threshold, rootMargin, triggerOnce]);

  return containerRef;
};

/**
 * Initializes scroll reveal for the entire page
 * Call this once in _app.js or a layout component
 */
export const initScrollReveal = (options = {}) => {
  if (typeof window === 'undefined') return;

  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-fade-up, .scroll-fade-down, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in, .scroll-blur-in, .scroll-fade');

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          entry.target.classList.remove('in-view');
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  return () => {
    revealElements.forEach((el) => observer.unobserve(el));
  };
};

export default useScrollReveal;
