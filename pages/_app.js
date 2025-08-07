import { useEffect } from 'react';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import SEO from '@/lib/next-seo.config';
import * as ga from '@/lib/ga';
import theme from '@/lib/theme';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Lester Cardoz - Software Engineer</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
