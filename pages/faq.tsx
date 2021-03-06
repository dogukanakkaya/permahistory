import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

const faq = [
    {
        id: '4',
        title: 'How to use Permahistory?',
        content: 'You can use **[ArConnect](https://www.arconnect.io/)** wallet extension or **[Arweave Web Wallet](https://www.arweave.app/)** to connect **Permahistory**. I hope soon you will be able to pay transaction fees with ETH or other supported tokens.'
    },
    {
        id: '1',
        title: 'How Permahistory works?',
        content: '**Permahistory** runs on **Arweave Blockchain**, everything you write will be permanently/forever stored on **Arweave**.'
    },
    {
        id: '2',
        title: 'What can i write?',
        content: 'You can write everything, notes, diaries, future thoughts etc. One day, even testaments maybe.'
    },
    {
        id: '3',
        title: 'Do i have to pay?',
        content: 'Not to Permahistory. Nevertheless you have to pay some transaction fees with **AR coin** depends on what you write (size of what you write).'
    }
];

function Faq() {
    return (
        <>
            <Head>
                <title>Permahistory - FAQ</title>
                <meta name="description" content="" />
            </Head>

            <div className="min-h-[calc(100vh-theme('spacing.40'))] container flex flex-col items-center my-10">
                {
                    faq.map(({ id, title, content }) => (
                        <details key={id} className="w-full md:w-1/2 my-2 rounded shadow cursor-pointer bg-white bg-hover:bg-gray-100 dark:bg-[#010102] hover:dark:bg-black hover:dark:shadow-xl">
                            <summary className="flex justify-between items-center cursor-pointer text-xl px-6 py-4 focus:outline-none"><span>{title}</span><i className='bi bi-chevron-down transition-transform duration-300'></i></summary>
                            <div className='px-6 py-4 prose dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500'>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        </details>
                    ))
                }
            </div>
        </>
    )
}

export default Faq