import { useEffect, useState } from 'react';
import { arweave, arweaveDecrypt, getTransactionsByVisibility } from '../arweave';
import HistoryItem, { type HistoryItem as HistoryItemType } from '../components/history-item';
import Head from 'next/head';
import Loading from '../components/loading';
import { Visibility } from './write';
import useArConnect from '../context/useArConnect';

function History() {
    const { arConnectLoaded } = useArConnect();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItemType[]>([]);

    const getTransactions = async () => {
        const loadingTimeout = setTimeout(() => {
            setLoading(true);
        }, 250);

        try {
            const { data } = await getTransactionsByVisibility({ visibility: Visibility.Private });

            const txIds: string[] = data.transactions.edges.map((edge: any /* todo: fix type */) => edge.node.id);

            const txDatas = await Promise.all(
                txIds.map(txId => new Promise<HistoryItemType>(async resolve => {
                    const txData = await arweave.transactions.getData(txId, { decode: true });
                    const encrpytedTxData = JSON.parse(await arweaveDecrypt(txData as Uint8Array));
                    encrpytedTxData.txId = txId;

                    resolve(encrpytedTxData);
                }))
            );

            setHistory(txDatas);

            clearTimeout(loadingTimeout);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (arConnectLoaded) {
            getTransactions();
        }
    }, [arConnectLoaded])

    return (
        <>
            <Head>
                <title>Permahistory - My History</title>
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