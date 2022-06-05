import { useRouter } from 'next/router';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import config from '../config';
import { type PermissionType } from 'arconnect';
import { ArweaveWebWallet } from 'arweave-wallet-connector';

interface Context {
    arConnectLoaded: boolean;
}

interface ContextProps {
    children: ReactNode;
}

const NEEDED_PERMISSIONS: PermissionType[] = ['SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'ACCESS_PUBLIC_KEY', /*'DISPATCH'*/];

const ArConnectContext = createContext<Context>({} as Context);

export const ArConnectProvider = (props: ContextProps) => {
    const [arConnectLoaded, setArConnectLoaded] = useState(false);
    const router = useRouter();

    const handleArWalletLoaded = () => setArConnectLoaded(true)

    const connectWithArweaveWebWallet = async () => {
        const wallet = new ArweaveWebWallet({
            name: config.APP_NAME,
            logo: config.APP_LOGO
        });

        wallet.setUrl('https://www.arweave.app/');

        await wallet.connect();
    }

    const handleWalletConnection = async () => {
        if (['/my-history', '/history/[txId]', '/write'].includes(router.pathname)) {
            if (arConnectLoaded && window.arweaveWallet) {
                const permissions = await window.arweaveWallet.getPermissions();
                const missingPermissions = NEEDED_PERMISSIONS.filter(permission => !permissions.includes(permission));

                if (missingPermissions.length > 0) {
                    try {
                        await window.arweaveWallet.connect(missingPermissions, {
                            name: config.APP_NAME,
                            logo: config.APP_LOGO
                        });
                    } catch (_) {
                        connectWithArweaveWebWallet();
                    }
                }
            } else {
                connectWithArweaveWebWallet();
            }
        }
    }

    useEffect(() => {
        window.addEventListener('arweaveWalletLoaded', handleArWalletLoaded);

        handleWalletConnection();

        return () => window.removeEventListener('arweaveWalletLoaded', handleArWalletLoaded);
    }, [router.pathname, arConnectLoaded]);

    return (
        <ArConnectContext.Provider value={{ arConnectLoaded }}>
            {props.children}
        </ArConnectContext.Provider>
    )
}

export default function useArConnect() {
    return useContext(ArConnectContext);
}