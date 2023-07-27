import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import emailjs from '@emailjs/browser';

// Animations
import { gsap } from 'gsap';

// Icons
import { AiOutlineClose } from 'react-icons/ai';

const Contact = () => {
  const sectionRef = useRef(null);
  const form = useRef();
  const [alert, setAlert] = useState({
    active: false,
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateID = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID;
    const serviceID = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
    const userID = process.env.NEXT_PUBLIC_MAIL_USER_ID;

    // console.log('Template ID: ', templateID);
    // console.log('Service ID: ', serviceID);
    // console.log('User ID: ', userID);

    emailjs.sendForm(serviceID, templateID, form.current, userID).then(
      () => {
        setAlert({
          active: true,
          type: 'success',
        });
      },
      () => {
        setAlert({
          active: true,
          type: 'error',
        });
      }
    );
  };

  const handleClose = () => {
    setAlert({
      active: false,
      type: 'success',
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
      <Head>
        <title>Contact me 📲</title>
        <meta name="description" content="Page to contact me @josegabjimenez" />
      </Head>
      <article className="sm:text-left text-center ">
        <h1 className="sm:text-7xl text-5xl font-extrabold">Send me an email ✉</h1>
        <form ref={form} onSubmit={handleSubmit} className="form-control w-full">
          {/* User name */}
          <label htmlFor="user_name" className="label mt-2">
            <span className="label-text">What is your name?</span>
          </label>
          <input type="text" name="user_name" placeholder="Name here" className="input input-bordered w-full" />
          {/* User email */}
          <label htmlFor="user_email" className="label mt-2">
            <span className="label-text">What is your email?</span>
          </label>
          <input type="text" name="user_email" placeholder="Email here" className="input input-bordered w-full" />
          {/* Message */}
          <label htmlFor="message" className="label mt-2">
            <span className="label-text">Text me</span>
          </label>
          <textarea className="textarea textarea-bordered" name="message" placeholder="Message" defaultValue={''} />
          <button className="btn btn-accent btn-outline my-8">Send</button>
        </form>

        {/* alerts */}
        {alert.active ? (
          alert.type === 'success' ? (
            <div className="alert alert-success shadow-lg fixed bottom-0 right-0 sm:bottom-10 sm:right-5 w-full sm:w-96">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Your message has been sent!</span>
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

                <span>There was an error :c, please try again later.</span>
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
