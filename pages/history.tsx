import { useEffect, useState } from 'react';
import { arweave, getTransactionsByVisibility } from '../arweave';
import HistoryItem, { type HistoryItem as HistoryItemType } from '../components/history-item';
import Head from 'next/head';
import Loading from '../components/loading';
import { Visibility } from './write';

function History() {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItemType[]>([]);

    const getTransactions = async () => {
        const loadingTimeout = setTimeout(() => {
            setLoading(true);
        }, 250);

        try {
            const { data } = await getTransactionsByVisibility({ visibility: Visibility.Public });

            const txIds: string[] = data.transactions.edges.map((edge: any /* todo: fix type */) => edge.node.id);

            const txDatas = await Promise.all(
                txIds.map(txId => arweave.transactions.getData(txId, { decode: true, string: true }))
            ) as string[];

            // todo: find a better way to do this (maybe saving txId when making transaction)
            setHistory(txDatas.map(txData => {
                const d = JSON.parse(txData);
                d.txId = txIds[txDatas.indexOf(txData)];

                return d;
            }));

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
            <Head>
                <title>Permahistory - History</title>
                <meta name="description" content="" />
            </Head>

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