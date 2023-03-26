import { useEffect, useState } from 'react';
import HistoryItem, { type HistoryItem as HistoryItemType } from '../components/history-item';
import Loading from '../components/loading';
import { contract } from '@/warp/client';

function History() {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItemType[]>([]);

    const getTransactions = async () => {
        const loadingTimeout = setTimeout(() => {
            setLoading(true);
        }, 500);

        try {
            const { cachedValue } = await contract.readState();
            const state = cachedValue.state as { history: HistoryItemType[], [key: string]: any };
            setHistory(state.history)

            clearTimeout(loadingTimeout);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTransactions();
    }, [])

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
                    </div>
                )
            }
        </>
    )
}

export default History