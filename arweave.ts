import Arweave from 'arweave';
import config from './config';
import { Visibility } from './pages/write';

export const arweave = Arweave.init({
    host: config.ARWEAVE_HOST,
    port: config.ARWEAVE_PORT,
    protocol: config.ARWEAVE_PROTOCOL
});

// todo: fetch to axios maybe
export const getTransactionsByVisibility = async ({ visibility }: { visibility: Visibility }) => {
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
                            values: ["${config.APP_NAME}"]
                        }
                        {
                            name: "Visibility",
                            values: ["${visibility}"]
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

    return response.json();
}

export const getTransactionsById = async (id: string) => {
    const response = await fetch(`${config.ARWEAVE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query {
                    transactions(ids: ["${id}"]) {
                        edges {
                            node {
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

    return response.json();
}

export const arweaveEncrypt = (value: string): Promise<Uint8Array> => window.arweaveWallet.encrypt(value, config.ARCONNECT_ENCRYPT_OPTIONS);
export const arweaveDecrypt = (value: Uint8Array): Promise<string> => window.arweaveWallet.decrypt(value, config.ARCONNECT_ENCRYPT_OPTIONS);