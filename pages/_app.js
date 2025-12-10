import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@styles/globals.css';
import 'lenis/dist/lenis.css';
import { Layout, SmoothScroll } from '@components/index';
import { ThemeProvider } from '@hooks/useTheme';
import { initScrollReveal } from '@hooks/useScrollReveal';

// Analytics
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Initialize scroll reveal animations on page load and route changes
  useEffect(() => {
    // Small delay to ensure DOM is ready after page transition
    const timeout = setTimeout(() => {
      initScrollReveal({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        triggerOnce: true,
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [router.asPath]);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default MyApp;
