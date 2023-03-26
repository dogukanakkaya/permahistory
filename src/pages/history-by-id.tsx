import { contract } from '@/warp-client';
import { HistoryItemType, HistoryItemTypeEncoded } from '@/zod';
import { useRouter } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import ReactMarkdown from 'react-markdown';
import { Visibility } from './write';
import { arweaveDecrypt } from '@/utils';

export default function HistoryById() {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState<HistoryItemType | null>(null);
    const router = useRouter();
    const id = router[0].matches?.id || 0;

    const getTransaction = async () => {
        const loadingTimeout = setTimeout(() => {
            setLoading(true);
        }, 500);

        try {
            const { result }: { result: { item: HistoryItemTypeEncoded } } = await contract.viewState({
                function: 'getHistoryById',
                query: { id }
            });

            const content = Uint8Array.from(Object.values(result.item.content));

            setItem({
                ...result.item,
                content: result.item.visibility === Visibility.Public ? new TextDecoder().decode(content) : await arweaveDecrypt(content)
            });

            clearTimeout(loadingTimeout);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTransaction();
    }, [id])

    return (
        <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
            <div className='max-w-none prose dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500'>
                {item && <ReactMarkdown>{item.content}</ReactMarkdown>}
            </div>
        </div>
    )
}