import Head from 'next/head';
import Editor from '../components/editor/editor';
import Arweave from 'arweave';
import { useState } from 'react';

function Write() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    const arweave = Arweave.init({
        // host: 'arweave.net',
        // port: 443,
        // protocol: 'https'
        host: '127.0.0.1',
        port: 1984,
        protocol: 'http'
    });

    const transact = async () => {
        try {
            setLoading(true);

            const tx = await arweave.createTransaction({ data });
            tx.addTag('Content-Type', 'text/plain');

            await arweave.transactions.sign(tx);

            const lastTx = await arweave.wallets.getLastTransactionID(await window.arweaveWallet.getActiveAddress());

            const txData = await arweave.transactions.getData(lastTx, { decode: true, string: true });

            // why
            console.log(txData);


            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.dir(err);
        }
    }

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
                        <Editor data={data} setData={setData} />
                        <div className="text-right mt-5">
                            {
                                loading ? 'Please wait...' :
                                    <>
                                        <button className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-4">
                                            Save Privately <i className='bi bi-lock ml-2'></i>
                                        </button>
                                        <button onClick={() => transact()} className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5">
                                            Save Publicly <i className='bi bi-save ml-2'></i>
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Write