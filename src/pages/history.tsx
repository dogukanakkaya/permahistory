import { useEffect, useState } from 'react';
import HistoryItem from '@/components/history-item';
import Loading from '@/components/loading';
import { contract } from '@/warp-client';
import { Link, useRouter } from 'preact-router';
import useArConnect from '@/context/useArConnect';
import { HistoryItemType, WriteRouteParameters } from '@/zod';

const PER_PAGE = 14;

export default function History() {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItemType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const { arConnectLoaded, getPublicKey } = useArConnect();
    const router = useRouter();
    const { myHistory, page } = WriteRouteParameters.parse(router[0].matches);

    const getTransactions = async () => {
        if (myHistory && !arConnectLoaded) return;

        const loadingTimeout = setTimeout(() => {
            setLoading(true);
        }, 500);

        try {
            const { result }: { result: { history: HistoryItemType[], total: number } } = await contract.viewState({
                function: 'getHistory',
                query: {
                    orderBy: {
                        field: 'id',
                        direction: 'desc'
                    },
                    start: ((page - 1) * PER_PAGE).toString(),
                    end: (page * PER_PAGE).toString(),
                    filterBy: {
                        address: myHistory ? await getPublicKey() : undefined
                    }
                }
            });

            console.log(result);

            setHistory(result.history);
            setTotal(result.total);

            clearTimeout(loadingTimeout);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTransactions();
    }, [myHistory, page, getPublicKey])

    return (
        <>
            {
                loading ? (
                    <div className="h-[calc(100vh-theme('spacing.20'))] flex items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
                        <div className="grid lg:grid-cols-2 gap-4">
                            {
                                history.map((h, i) => <HistoryItem key={i} item={h} />)
                            }
                        </div>
                        <div className="flex justify-between items-center mt-8">
                            <ul className="flex gap-4">
                                {
                                    [...Array(Math.ceil(total / PER_PAGE)).keys()].map((i) => (
                                        <li>
                                            <Link href={`${router[0].path}?page=${i + 1}${myHistory ? '&my=1' : ''}`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800">{i + 1}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <span>Showing between {(page - 1) * PER_PAGE} - {page * PER_PAGE} of {total} items</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}