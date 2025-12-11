import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { SEO } from '@components/index';

// Animations
import { gsap } from 'gsap';

// Icons
import { AiOutlineClose } from 'react-icons/ai';

// Minimum time (in ms) a human would take to fill the form
const MIN_SUBMISSION_TIME = 3000;
// Rate limit: minimum time between submissions (in ms)
const RATE_LIMIT_TIME = 60000;

const Contact = () => {
  const sectionRef = useRef(null);
  const form = useRef();
  const [alert, setAlert] = useState({
    active: false,
    type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formLoadTime] = useState(Date.now());

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check for suspicious content patterns (random strings, etc.)
  const hasSuspiciousContent = (text) => {
    // Check for very long strings without spaces (like "DtOarKaGrgVEbGialtKfjbok")
    const words = text.split(/\s+/);
    for (const word of words) {
      if (word.length > 20 && !/^https?:\/\//.test(word)) {
        return true;
      }
    }
    // Check for random character patterns (high entropy strings)
    const randomPattern = /^[a-zA-Z]{10,}$/;
    if (randomPattern.test(text.trim())) {
      return true;
    }
    return false;
  };

  // Check rate limiting using localStorage
  const isRateLimited = () => {
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    if (lastSubmission) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission, 10);
      if (timeSinceLastSubmission < RATE_LIMIT_TIME) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(form.current);
    const userName = formData.get('user_name')?.trim() || '';
    const userEmail = formData.get('user_email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    const honeypot = formData.get('website') || '';

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      // Silently reject but show success to confuse bots
      setAlert({
        active: true,
        type: 'success',
        message: 'Your message has been sent!',
      });
      return;
    }

    // Time-based check - reject if form was filled too fast
    const timeToFill = Date.now() - formLoadTime;
    if (timeToFill < MIN_SUBMISSION_TIME) {
      setAlert({
        active: true,
        type: 'error',
        message: 'Please take your time filling out the form.',
      });
      return;
    }

    // Rate limiting check
    if (isRateLimited()) {
      setAlert({
        active: true,
        type: 'error',
        message: 'Please wait a moment before sending another message.',
      });
      return;
    }

    // Field validation
    if (!userName || userName.length < 2) {
      setAlert({
        active: true,
        type: 'error',
        message: 'Please enter a valid name.',
      });
      return;
    }

    if (!isValidEmail(userEmail)) {
      setAlert({
        active: true,
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (!message || message.length < 10) {
      setAlert({
        active: true,
        type: 'error',
        message: 'Please enter a message (at least 10 characters).',
      });
      return;
    }

    // Check for suspicious content
    if (hasSuspiciousContent(userName) || hasSuspiciousContent(message)) {
      setAlert({
        active: true,
        type: 'error',
        message: 'Your message appears to contain invalid content.',
      });
      return;
    }

    setIsSubmitting(true);

    const templateID = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID;
    const serviceID = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
    const userID = process.env.NEXT_PUBLIC_MAIL_USER_ID;

    emailjs.sendForm(serviceID, templateID, form.current, userID).then(
      () => {
        // Store submission time for rate limiting
        localStorage.setItem('lastContactSubmission', Date.now().toString());
        setAlert({
          active: true,
          type: 'success',
          message: 'Your message has been sent!',
        });
        form.current.reset();
        setIsSubmitting(false);
      },
      () => {
        setAlert({
          active: true,
          type: 'error',
          message: 'There was an error, please try again later.',
        });
        setIsSubmitting(false);
      }
    );
  };

  const handleClose = () => {
    setAlert({
      active: false,
      type: '',
      message: '',
    });
  };

  useEffect(() => {
    if (alert.active) {
      setTimeout(() => {
        handleClose();
      }, 5000);
    }
  }, [alert]);

  //Animation intro
  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <section ref={sectionRef} className="sm:flex-row flex-col flex justify-center items-center gap-12 px-2 my-12">
      <SEO
        title="Contact Jose Gabriel Jiménez"
        description="Get in touch with Jose Gabriel Jiménez for web development projects, collaborations, or job opportunities. Reach out via email to discuss your next React, Next.js, or full-stack development project. Available for freelance and full-time opportunities."
        keywords="Contact Jose Gabriel Jimenez, Hire Full-Stack Developer, Web Developer Contact, React Developer for Hire, Next.js Expert Contact, josegabjimenez contact, josegabjimenez.dev contact, Email Jose Gabriel, Web Development Services"
        url="https://josegabjimenez.dev/contact"
        type="website"
      />
      <article className="sm:text-left text-center ">
        <h1 className="sm:text-7xl text-5xl font-extrabold scroll-fade-up">Send me an email ✉</h1>
        <form ref={form} onSubmit={handleSubmit} className="form-control w-full scroll-fade-up scroll-delay-200">
          {/* Honeypot field - hidden from humans, bots will fill it */}
          <input
            type="text"
            name="website"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          {/* User name */}
          <label htmlFor="user_name" className="label mt-2">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            name="user_name"
            placeholder="Name here"
            className="input input-bordered w-full"
            required
            minLength={2}
            maxLength={100}
          />
          {/* User email */}
          <label htmlFor="user_email" className="label mt-2">
            <span className="label-text">What is your email?</span>
          </label>
          <input
            type="email"
            name="user_email"
            placeholder="Email here"
            className="input input-bordered w-full"
            required
          />
          {/* Message */}
          <label htmlFor="message" className="label mt-2">
            <span className="label-text">Text me</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            name="message"
            placeholder="Message"
            defaultValue={''}
            required
            minLength={10}
            maxLength={2000}
          />
          <button
            className="btn btn-accent btn-outline my-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>

        {/* alerts */}
        {alert.active ? (
          alert.type === 'success' ? (
            <div className="alert alert-success shadow-lg fixed bottom-0 right-0 sm:bottom-10 sm:right-5 w-full sm:w-96">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{alert.message}</span>
              </div>
              <div onClick={handleClose} className="cursor-pointer md:block hidden">
                <AiOutlineClose />
              </div>
            </div>
          ) : (
            <div className="alert alert-error shadow-lg fixed bottom-0 right-0 sm:bottom-10 sm:right-5 w-full sm:w-[450px]">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{alert.message}</span>
              </div>
              <div onClick={handleClose} className="cursor-pointer md:block hidden">
                <AiOutlineClose />
              </div>
            </div>
          )
        ) : null}
      </article>
    </section>
  );
};

export default Contact;
