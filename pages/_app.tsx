import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';
import { ArConnectProvider } from '../context/useArConnect';
import favicon from '../public/favicon.ico';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ArConnectProvider>
      <Layout>
        <Head>
          <link rel="icon" href={favicon.src} />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ArConnectProvider>
  )
}

export default MyApp
