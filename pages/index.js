import { useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import avatar from '@assets/images/Avatar.png';

// Animations
import { gsap } from 'gsap';

export default function Home() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const iconBgRef = useRef();
  const iconFaceRef = useRef();

  // Intro animation
  useEffect(() => {
    gsap
      .timeline()
      .fromTo(titleRef.current, { y: 100, opacity: 0, duration: 0.5 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo(subtitleRef.current, { y: 100, opacity: 0, duration: 0.5 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1)
      .fromTo(iconBgRef.current, { y: 100, opacity: 0, duration: 0.3 }, { y: 0, opacity: 1, duration: 0.3 }, 0.1)
      .fromTo(iconFaceRef.current, { opacity: 0, duration: 0.5 }, { opacity: 1, duration: 0.5 }, 0.05);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hi, I&apos;m Jose 🧑🏽</title>
        <meta name="description" content="Welcome to my website! I'm Jose Gabriel Jiménez Vidales" />
        <link rel="icon" href="/coding.png" />
      </Head>

      <section className="intro flex flex-col justify-center items-center mt-12 mb-12">
        <h1 ref={titleRef} className="text-2xl text-center">
          Hi, I&apos;m <span className="text-primary font-bold underline cursor-pointer">Jose Gabriel Jiménez</span>
        </h1>
        <h2 ref={subtitleRef} className="text-4xl font-bold text-center">
          Full-Stack Developer
        </h2>
        <div ref={iconBgRef} className="bg-red-500 w-32 h-28 rounded-full relative mt-12">
          <div ref={iconFaceRef} className="absolute -bottom-2">
            <Image src={avatar} width={200} height={200} alt="Jose Gabriel's Cartoon Picture" />
          </div>
        </div>
      </section>
      {/* <style jsx>{`
        h1 {
          text-align: center;
          color: #f2a;
          margin-top: 40px;
        }
      `}</style> */}
    </div>
  );
}
