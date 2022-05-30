import Arweave from 'arweave';
import config from './config';
import { Visibility } from './pages/write';

export const arweave = Arweave.init({
    host: config.ARWEAVE_HOST,
    port: config.ARWEAVE_PORT,
    protocol: config.ARWEAVE_PROTOCOL
});

export const getTransactionsByVisibility = ({ visibility }: { visibility: Visibility }) => {
    return fetch(`${config.ARWEAVE_URL}/graphql`, {
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
}

export const arweaveEncrypt = (value: string): Promise<Uint8Array> => window.arweaveWallet.encrypt(value, config.ARCONNECT_ENCRYPT_OPTIONS);
export const arweaveDecrypt = (value: Uint8Array): Promise<string> => window.arweaveWallet.decrypt(value, config.ARCONNECT_ENCRYPT_OPTIONS);