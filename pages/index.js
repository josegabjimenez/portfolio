import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import avatar from '@assets/images/Avatar.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hi, I&apos;m Jose 🧑🏽</title>
        <meta name="description" content="Welcome to my website! I'm Jose Gabriel Jiménez Vidales" />
        <link rel="icon" href="/coding.png" />
      </Head>

      <section className="flex flex-col justify-center items-center mt-12 mb-12">
        <h1 className="text-4xl font-bold text-primary text-center">Welcome to my portfolio!</h1>
        <div className="bg-red-500 w-32 h-28 rounded-full relative mt-12">
          <div className="absolute -bottom-2">
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
