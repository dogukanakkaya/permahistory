import Loading from '@/components/loading';
import TagInput from '@/components/tag-input';
import useArConnect from '@/context/useArconnect';
import { contract } from '@/warp/client';
import { useState } from 'preact/hooks';

function Write() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    const { arConnectLoaded } = useArConnect();

    async function transact() {
        if (tags.length > 3) {
            alert('You can add up to 3 tags.');
            return;
        }

        if (!title || !content) {
            alert('You must fill title and content.');
            return;
        }

        setResult(null);
        setLoading(true);
        try {
            const result = await contract.writeInteraction({
                function: "addHistoryItem",
                history: { title, description, content, tags }
            });

            console.log(result);

            setTitle('');
            setDescription('');
            setContent('');
            setTags([]);
            setResult({ status: true, message: `Transaction successfully submitted (${result?.originalTxId}).` });

            setTimeout(() => {
                setResult(null);
            }, 5000);
        } catch (err) {
            setResult({ status: false, message: 'Transaction failed for a reason.' });
            console.log(err);
        }

        setLoading(false);
    }

    // (e.target as HTMLInputElement) https://github.com/preactjs/preact/issues/1930

    return (
        <>
            {/* <Head>
                <title>Permahistory - Write</title>
                <meta name="description" content="" />
            </Head> */}

            {
                arConnectLoaded ? (
                    <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
                        <div className='flex flex-col items-center'>
                            <div className='md:w-5/6 lg:w-2/3'>
                                <div className='text-center mb-4'>
                                    <h1 className='lg:text-4xl'>Write anything...</h1>
                                    <p className='text-xs sm:text-sm text-gray-400'>remember that you have to pay some transaction fees for {`>`}100kb data size in order to add your writings to the blockchain.</p>
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <input onChange={e => setTitle((e.target as HTMLInputElement).value)} autoFocus={true} type="text" value={title} placeholder='Enter your title *' className='px-4 py-2 w-full outline-none dark:text-white dark:bg-black' />
                                    </div>
                                    <div className="mb-3">
                                        <input onChange={e => setDescription((e.target as HTMLInputElement).value)} type="text" value={description} placeholder='Enter your description' className='px-4 py-2 w-full outline-none dark:text-white dark:bg-black' />
                                    </div>
                                    <div className="mb-3">
                                        <textarea onChange={e => setContent((e.target as HTMLInputElement).value)} rows={10} value={content} placeholder='Enter your content *' className='px-4 py-2 w-full outline-none dark:text-white dark:bg-black' ></textarea>
                                    </div>
                                    <TagInput tags={tags} setTags={setTags} className="mb-3" />
                                </form>
                                <div className="flex justify-end mt-5">
                                    {
                                        loading ? <Loading /> :
                                            <>
                                                <button onClick={() => { }} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-4">
                                                    Save Privately <i className='bi bi-lock ml-2'></i>
                                                </button>
                                                <button onClick={transact} className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5">
                                                    Save Publicly <i className='bi bi-save ml-2'></i>
                                                </button>
                                            </>
                                    }
                                </div>
                                {
                                    result?.message && (
                                        <div className={`mt-5 border-l-4 ${result.status ? 'border-green-500' : 'border-red-500'} bg-gray-100 dark:bg-gray-700`}>
                                            <div className="dark:text-white p-2">
                                                {result.message}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export enum Visibility {
    Private = 'private',
    Public = 'public'
}

interface Result {
    status: boolean;
    message: string;
}

export default Write