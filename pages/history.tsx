import Link from 'next/link';
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
                        ]) {
                            edges {
                                node {
                                    id
                                    recipient
                                    owner {
                                        address
                                        key
                                    }
                                    data {
                                        size
                                        type
                                    }
                                    tags {
                                        name
                                        value
                                    }
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
            <div className="flex flex-col gap-y-4">
                {
                    history.map(h => <HistoryItem item={h} />)
                }
            </div>
        </div>
    )
}

export default History