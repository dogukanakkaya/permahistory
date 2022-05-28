import Arweave from 'arweave';
import config from '../config';
import { useEffect, useState } from 'react';
import HistoryItem, { type HistoryItem as HistoryItemType } from '../components/history-item';

function History() {
    const [history, setHistory] = useState<HistoryItemType[]>([]);
    const arweave = Arweave.init({
        host: config.ARWEAVE_HOST,
        port: config.ARWEAVE_PORT,
        protocol: config.ARWEAVE_PROTOCOL
    });

    const getTransactions = async () => {
        const response = await fetch(`${config.ARWEAVE_URL}/graphql`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        transactions(tags: [
                            {
                                name: "App-Name",
                                values: ["Permahistory"]
                            }
                            {
                                name: "Visibility",
                                values: ["public"]
                            }
                        ]) {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                `
            })
        });

        const { data } = await response.json();

        const txIds: string[] = data.transactions.edges.map((edge: any /* todo: fix type */) => edge.node.id);

        const txDatas = await Promise.all(txIds.map((txId) => arweave.transactions.getData(txId, { decode: true, string: true }))) as string[];

        setHistory(txDatas.map(txData => JSON.parse(txData)));
    }

    useEffect(() => {
        getTransactions();
    }, [])

    return (
        <div className="min-h-[calc(100vh-theme('spacing.40'))] container my-10">
            <div className="grid lg:grid-cols-2 gap-4">
                {
                    history.map((h, i) => <HistoryItem key={i} item={h} />)
                }
            </div>
        </div>
    )
}

export default History