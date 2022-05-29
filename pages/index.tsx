import type { NextPage } from 'next';
import Head from 'next/head';
import Typewriter from 'typewriter-effect';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Permahistory - Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:h-[calc(100vh-theme('spacing.20'))] container flex flex-wrap justify-between items-center mb-10 lg:mb-0">
        <div className="w-full lg:w-3/5 lg:h-full lg:max-w-2xl 2xl:max-w-3xl flex flex-col lg:justify-evenly gap-10">
          <div>
            <h1 className='text-4xl sm:text-6xl xl:text-7xl font-semibold text-gray-900 dark:text-white'>
              Next generation <span className='text-main'>permahistory</span> notebook on <span className='text-main'>the arweave blockchain</span>
            </h1>
            <p className='text-gray-400 mt-5 uppercase text-xs xs:text-sm tracking-wider'>
              create notes, diaries for the future that are<br />
              <b>permanently</b> stored on the <b>arweave blockchain</b>.
            </p>
          </div>
          <div>
            <button type="button" className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5 mr-4">Learn Permahistory</button>
            <a href="https://www.arweave.org/" title="Arweave" target="_blank" rel="noreferrer" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
              Learn Arweave
            </a>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-full flex flex-col justify-evenly gap-10 mt-10 lg:mt-0">
          <div className='w-full'>
            <div className='bg-gradient-to-r bg-gray-900 rounded-tl-xl rounded-tr-xl p-2'>
              <div>
                <i className='bi bi-chevron-left text-gray-500 mr-3'></i>
                <i className='bi bi-chevron-right text-gray-500 mr-3'></i>
                <span className='text-main'>Permanote.txt</span>
              </div>
            </div>
            <div className='flex items-center w-full text-lg xl:text-xl p-4 whitespace-pre-line text-gray-100 dark:text-inherit bg-gray-800 dark:bg-[#010102] h-96 rounded-bl-xl rounded-br-xl'>
              <Typewriter
                options={{
                  delay: 25,
                  loop: true
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<i class="bi bi-chevron-right text-xs text-main"></i> Wanna write a <b>permanent</b> future note to yourself?\n\n')
                    .pauseFor(1000)
                    .typeString('<i class="bi bi-chevron-right text-xs text-main"></i> Maybe a <b>permanent</b> future guess about the human kind?\n\n')
                    .pauseFor(1000)
                    .typeString('<i class="bi bi-chevron-right text-xs text-main"></i> Or maybe just a <b>permanent</b> note from the past?')
                    .pauseFor(1000)
                    .deleteAll()
                    .start();
                }}
              />
            </div>
          </div>
          <div className='flex justify-between flex-wrap'>
            <div className='w-1/3'>
              <h3 className='flex flex-col items-center'><i className='bi bi-infinity text-4xl text-main'></i> Permanent</h3>
              <p className='text-center text-xs sm:text-sm text-gray-400'>Everything you write will permanently stored on the blockhain.</p>
            </div>
            <div className='w-1/3'>
              <h3 className='flex flex-col items-center'><i className='bi bi-boxes text-4xl text-main'></i> Decentralized</h3>
              <p className='text-center text-xs sm:text-sm text-gray-400'>All of your data is in decentralized <a href="https://www.arweave.org/" title="Arweave" target="_blank" rel="noreferrer">arweave</a> blockchain.</p>
            </div>
            <div className='w-1/3'>
              <h3 className='flex flex-col items-center'><i className='bi bi-key text-4xl text-main'></i> Private</h3>
              <p className='text-center text-xs sm:text-sm text-gray-400'>You can also write private notes as well as public ones.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
