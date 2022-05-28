import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { type HistoryItem } from '../../components/history-item';
import config from '../../config';
import Arweave from 'arweave';

function SingleHistory() {
    const [item, setItem] = useState<HistoryItem | null>(null);
    const router = useRouter();

    const { txId } = router.query;


    const arweave = Arweave.init({
        host: config.ARWEAVE_HOST,
        port: config.ARWEAVE_PORT,
        protocol: config.ARWEAVE_PROTOCOL
    });

    useEffect(() => {
        if (router.isReady) {
            if (typeof txId !== 'string' || !txId) {
                router.push('/history');
                return;
            }

            arweave.transactions.getData(txId, { decode: true, string: true }).then(data => setItem(JSON.parse(data as string)))
        }
    }, [txId])

    return (
        <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
            <div className='max-w-none prose dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500'>
                {item && <ReactMarkdown>{item.content}</ReactMarkdown>}
            </div>
        </div>
    )
}

export default SingleHistory