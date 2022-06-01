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

interface Context {
    arConnectLoaded: boolean;
}

interface ContextProps {
    children: ReactNode;
}

// @ts-ignore arweave module should upgrade arconnect)
const NEEDED_PERMISSIONS: PermissionType[] = ['SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'ACCESS_PUBLIC_KEY', 'DISPATCH'];

const ArConnectContext = createContext<Context>({} as Context);

export const ArConnectProvider = (props: ContextProps) => {
    const [arConnectLoaded, setArConnectLoaded] = useState(false);
    const router = useRouter();

    const handleArWalletLoaded = () => setArConnectLoaded(true)

    useEffect(() => {
        window.addEventListener('arweaveWalletLoaded', handleArWalletLoaded);

        (async () => {
            if (arConnectLoaded && ['/history', '/my-history', '/history/[txId]', '/write'].includes(router.pathname)) {
                const permissions = await window.arweaveWallet.getPermissions();
                // @ts-ignore arweave module should upgrade arconnect)
                const missingPermissions = NEEDED_PERMISSIONS.filter(permission => !permissions.includes(permission))

                if (missingPermissions.length > 0) {
                    // @ts-ignore arweave module should upgrade arconnect)
                    window.arweaveWallet.connect(NEEDED_PERMISSIONS, { name: config.APP_NAME });
                }
            }
        })();

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