import { contract } from '@/warp-client';
import { HistoryItemType } from '@/zod';
import { useRouter } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import ReactMarkdown from 'react-markdown';

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
            const { result }: { result: { item: HistoryItemType } } = await contract.viewState({
                function: 'getHistoryById',
                query: { id }
            });

            setItem(result.item);

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