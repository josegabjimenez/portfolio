import Head from 'next/head';

const SEO = ({
  title = 'Jose Gabriel Jiménez | Full-Stack Developer',
  description = 'Experienced Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable web and mobile applications that deliver exceptional user experiences and business impact.',
  keywords = 'Jose Gabriel Jimenez, Full-Stack Developer, Web Developer, React Developer, Frontend Developer, Next.js, Node.js, JavaScript, TypeScript, React Native, Web Development, Software Engineer, Portfolio, josegabjimenez, josegab.dev',
  image = '/og-image.jpg',
  url = 'https://josegab.dev',
  type = 'website',
  author = 'Jose Gabriel Jiménez',
  twitterHandle = '@josegabjimenez',
}) => {
  const pageTitle = title.includes('Jose Gabriel') ? title : `${title} | Jose Gabriel Jiménez`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Jose Gabriel Jiménez Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Jose Gabriel Jiménez" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Favicon */}
      <link rel="icon" href="/coding.png" />
      <link rel="apple-touch-icon" href="/coding.png" />
    </Head>
  );
};

export default SEO;
