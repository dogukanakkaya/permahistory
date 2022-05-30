import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Head from 'next/head'
import { ArConnectProvider } from '../context/useArConnect'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ArConnectProvider>
      <Layout>
        <Head>
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ArConnectProvider>
  )
}

export default MyApp
