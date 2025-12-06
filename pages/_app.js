import '@styles/globals.css';
import { Layout } from '@components/index';
import { ThemeProvider } from '@hooks/useTheme';

// Analytics
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
