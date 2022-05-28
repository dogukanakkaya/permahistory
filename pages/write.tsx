import Head from 'next/head';
import Editor from '../components/editor';
import Arweave from 'arweave';
import { useState } from 'react';
import TagInput from '../components/tag-input';
import { Tag } from 'react-tag-input';
import config from '../config';

function Write() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    const arweave = Arweave.init({
        host: config.ARWEAVE_HOST,
        port: config.ARWEAVE_PORT,
        protocol: config.ARWEAVE_PROTOCOL
    });

    const transactPublic = async () => {
        if (tags.length > 3) {
            alert('You can add up to 5 tags.');
            return;
        }

        if (!title || !content) {
            alert('You must fill title and content.');
            return;
        }

        setLoading(true);
        try {
            const tx = await arweave.createTransaction({
                data: JSON.stringify({
                    title,
                    description,
                    content,
                    createdAt: new Date().toISOString(),
                    tags: tags.map(tag => tag.text)
                })
            });

            tx.addTag('App-Name', config.APP_NAME);
            tx.addTag('Content-Type', 'text/plain');
            tx.addTag('Visibility', 'public');
            if (tags.length) {
                tags.forEach(tag => tx.addTag('topics', tag.text));
            }

            await arweave.transactions.sign(tx);

            const { status } = await arweave.transactions.post(tx);

            if (status !== 200) {
                setResult({ status: false, message: 'There has been a problem while submitting transaction.' });
                throw Error('Transaction failed');
            }

            setTitle('');
            setDescription('');
            setContent('');
            setTags([]);
            setResult({ status: true, message: 'Transaction successfully submitted.' });
        } catch (err: any) {
            setResult({ status: false, message: 'Transaction failed for a reason.' });
        }
        setLoading(false);

        setTimeout(() => {
            setResult(null);
        }, 5000);
    }

    return (
        <>
            <Head>
                <title>Permahistory - Write</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
                <div className='flex flex-col items-center'>
                    <div className='md:w-5/6 lg:w-2/3'>
                        <div className='text-center mb-2'>
                            <h1 className='lg:text-4xl'>Write anything...</h1>
                            <p className='text-xs sm:text-sm text-gray-400'>remember that you have to pay some transaction fees in order to add your writings to the blockchain.</p>
                        </div>
                        <div>
                            <div className="mb-3">
                                <input onChange={e => setTitle(e.target.value)} type="text" value={title} placeholder='Enter your title *' className='w-full' />
                            </div>
                            <div className="mb-3">
                                <input onChange={e => setDescription(e.target.value)} type="text" value={description} placeholder='Enter your description' className='px-4 py-2 w-full outline-none dark:text-white dark:bg-black' />
                            </div>
                            <Editor data={content} setData={setContent} className="mb-3 dark:invert" />
                            <TagInput tags={tags} setTags={setTags} className="mb-3" />
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