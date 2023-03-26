import { ARWEAVE } from '@/config';
import Arweave from 'arweave';

export const arweave = Arweave.init({
    host: ARWEAVE.ARWEAVE_HOST,
    port: ARWEAVE.ARWEAVE_PORT,
    protocol: ARWEAVE.ARWEAVE_PROTOCOL
});

// export const arweaveEncrypt = (value: string): Promise<Uint8Array> => window.arweaveWallet.encrypt(value, config.ARCONNECT_ENCRYPT_OPTIONS);
// export const arweaveDecrypt = (value: Uint8Array): Promise<string> => window.arweaveWallet.decrypt(value, config.ARCONNECT_ENCRYPT_OPTIONS);