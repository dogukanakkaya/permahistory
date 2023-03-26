import { useEffect, useState } from 'react';
import HistoryItem, { type HistoryItem as HistoryItemType } from '../components/history-item';
import Loading from '../components/loading';
import { arweave } from '@/arweave';
import { contractTxId } from '@/warp/transaction';

function History() {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItemType[]>([]);

    const getTransactions = async () => {
        const loadingTimeout = setTimeout(() => {
            setLoading(true);
        }, 250);

        try {
            const data = JSON.parse(await arweave.transactions.getData(contractTxId, { decode: true, string: true }) as string);

            console.log(data);

            // setHistory()

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
            {/* <Head>
                <title>Permahistory - History</title>
                <meta name="description" content="" />
            </Head> */}

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