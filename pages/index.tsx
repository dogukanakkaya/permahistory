import type { NextPage } from 'next';
import Head from 'next/head';
import Arweave from 'arweave';
import { useEffect } from 'react';
import Typewriter from 'typewriter-effect';

const Home: NextPage = () => {
  const arweaveGetAddress = async () => {
    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https'
    });
    window.arweaveWallet.connect(['ACCESS_ADDRESS']);

    const address = await window.arweaveWallet.getActiveAddress();
    console.log(address);
  }

  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", arweaveGetAddress);

    return () => {
      window.removeEventListener('arweaveWalletLoaded', arweaveGetAddress);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Permahistory</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container mt-10 flex justify-between items-center'>
        <div className="w-3/5 sm:max-w-xl xl:max-w-2xl">
          <div className='mb-5'>
            <h1 className='text-6xl font-extralight'>
              Next generation permahistory notebook
            </h1>
            <p className='text-gray-400 mt-5 uppercase text-sm tracking-wider'>
              create notes, diaries for the future that are<br />
              <strong>permanently</strong> stored on the <strong>arweave blockchain</strong>.
            </p>
          </div>
          <button type="button" className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5 text-center mr-4">Learn Permahistory</button>
          <a href="https://www.arweave.org/" title="Arweave" target="_blank" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
            Learn Arweave
          </a>
        </div>
        <div className='w-2/5'>
          <div className='bg-gradient-to-r bg-gray-900 rounded-tl-xl rounded-tr-xl p-2'>
            <div>
              <i className='bi bi-chevron-left text-gray-500 mr-3'></i>
              <i className='bi bi-chevron-right text-gray-500 mr-3'></i>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600'>Permanote.txt</span>
            </div>
          </div>
          <div className='flex items-center w-full text-lg p-4 whitespace-pre-line dark:bg-[#010102] h-96 rounded-bl-xl rounded-br-xl'>
            <Typewriter
              options={{
                delay: 25,
                loop: true
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString('<i class="bi bi-chevron-right text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600"></i> Wanna write a <strong>permanent</strong> future note to yourself?\n\n')
                  .pauseFor(1000)
                  .typeString('<i class="bi bi-chevron-right text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600"></i> Maybe a <strong>permanent</strong> future guess about the human kind?\n\n')
                  .pauseFor(1000)
                  .typeString('<i class="bi bi-chevron-right text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600"></i> Or maybe just a <strong>permanent</strong> note from the past?')
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
