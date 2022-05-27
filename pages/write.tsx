import Head from 'next/head'
import Editor from '../components/editor/editor'

function Write() {
    return (
        <>
            <Head>
                <title>Permahistory - Write</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="lg:h-[calc(100vh-theme('spacing.20'))] container">
                <div className='flex flex-col items-center mt-10'>
                    <div className='md:w-2/3'>
                        <div className='text-center'>
                            <h1 className='lg:text-4xl'>Write anything...</h1>
                            <p className='text-xs sm:text-sm text-gray-400'>remember that you have to pay some transaction fees in order to add your writings to the blockchain.</p>
                        </div>
                        <Editor />
                        <div className="text-right mt-5">
                            <button className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                Save <i className='bi bi-save ml-2'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Write