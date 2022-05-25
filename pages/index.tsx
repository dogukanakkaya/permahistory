import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Permahistory</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="font-bold">
          Welcome to <a href="#">Permahistory!</a>
        </h1>
      </main>
    </div>
  )
}

export default Home
