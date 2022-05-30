import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { type HistoryItem } from '../../components/history-item';
import { arweave, arweaveDecrypt, getTransactionsById } from '../../arweave';
import { Visibility } from '../write';
import Head from 'next/head';

function SingleHistory() {
    const [item, setItem] = useState<HistoryItem | null>(null);
    const router = useRouter();

    const { txId } = router.query;

    const getTransaction = async (id: string) => {
        const { data } = await getTransactionsById(id);

        const visibility = data.transactions.edges[0].node.tags.find((tag: { name: string, value: string }) => tag.name === 'Visibility');
        if (visibility.value === Visibility.Private) {
            const txData = await arweave.transactions.getData(id, { decode: true });
            const decrpytedTxData = await arweaveDecrypt(txData as Uint8Array);
            setItem(JSON.parse(decrpytedTxData));
        } else {
            const txData = await arweave.transactions.getData(id, { decode: true, string: true });
            setItem(JSON.parse(txData as string));
        }
    }

    useEffect(() => {
        if (router.isReady) {
            if (typeof txId !== 'string' || !txId) {
                router.push('/history');
                return;
            }

            getTransaction(txId);
        }
    }, [txId])

    return (
        <>
            <Head>
                <title>{item?.title}</title>
            </Head>

            <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
                <div className='max-w-none prose dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500'>
                    {item && <ReactMarkdown>{item.content}</ReactMarkdown>}
                </div>
            </div>
        </>
    )
}

export default SingleHistory