import Head from 'next/head';
import Editor from '../components/editor';
import Arweave from 'arweave';
import { useState } from 'react';
import TagInput from '../components/tag-input';
import { Tag } from 'react-tag-input';

function Write() {
    const [data, setData] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    const arweave = Arweave.init({
        // host: 'arweave.net',
        // port: 443,
        // protocol: 'https'
        host: '127.0.0.1',
        port: 1984,
        protocol: 'http'
    });

    const transactPublic = async () => {
        if (tags.length > 5) {
            alert('You can add up to 5 tags');
            return;
        }

        setLoading(true);
        try {
            const tx = await arweave.createTransaction({ data });

            tx.addTag('Content-Type', 'text/plain');
            if (tags.length) {
                tags.forEach(tag => tx.addTag(`tag-${tag.id}`, tag.text));
            }

            await arweave.transactions.sign(tx);

            const { status } = await arweave.transactions.post(tx);

            if (status !== 200) {
                setResult({ status: false, message: 'There has been a problem while submitting transaction.' });
                throw Error('Transaction failed');
            }

            // const lastTx = await arweave.wallets.getLastTransactionID(await window.arweaveWallet.getActiveAddress());

            // const txData = await arweave.transactions.getData(lastTx, { decode: true, string: true });

            setData('');
            setTags([]);
            setResult({ status: true, message: 'Transaction successfully submitted.' });
        } catch (err: any) {
            setResult({ status: false, message: 'Transaction failed for a reason.' });
        }
        setLoading(false);

        setTimeout(() => {
            setResult(null);
        }, 5000)
    }

    return (
        <>
            <Head>
                <title>Permahistory - Write</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mb-10">
                <div className='flex flex-col items-center mt-10'>
                    <div className='md:w-5/6 lg:w-2/3'>
                        <div className='text-center'>
                            <h1 className='lg:text-4xl'>Write anything...</h1>
                            <p className='text-xs sm:text-sm text-gray-400'>remember that you have to pay some transaction fees in order to add your writings to the blockchain.</p>
                        </div>
                        <div>
                            <Editor data={data} setData={setData} className="mt-5 dark:invert" />
                            <TagInput tags={tags} setTags={setTags} className="mt-5" />
                        </div>
                        <div className="text-right mt-5">
                            {
                                loading ? 'Please wait...' :
                                    <>
                                        <button className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-4">
                                            Save Privately <i className='bi bi-lock ml-2'></i>
                                        </button>
                                        <button onClick={() => transactPublic()} className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5">
                                            Save Publicly <i className='bi bi-save ml-2'></i>
                                        </button>
                                    </>
                            }
                        </div>
                        {
                            result?.status && (
                                <div className={`mt-5 border-l-4 ${result.status ? 'border-green-500' : 'border-red-500'} bg-gray-200 dark:bg-gray-700`}>
                                    <div className="text-white p-2">
                                        {result.message}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

interface Result {
    status: boolean;
    message: string;
}

export default Write