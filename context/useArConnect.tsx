import { useRouter } from 'next/router';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface Context {
    arConnectLoaded: boolean;
}

interface ContextProps {
    children: ReactNode;
}

const ArConnectContext = createContext<Context>({} as Context);

export const ArConnectProvider = (props: ContextProps) => {
    const [arConnectLoaded, setArConnectLoaded] = useState(false);
    const router = useRouter();

    const handleArWalletLoaded = () => setArConnectLoaded(true)

    useEffect(() => {
        if (arConnectLoaded && ['/history', '/my-history', '/history/[txId]', '/write'].includes(router.pathname)) {
            window.arweaveWallet.connect(['SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'ACCESS_PUBLIC_KEY']);
        }

        window.addEventListener('arweaveWalletLoaded', handleArWalletLoaded);

        return () => {
            window.removeEventListener('arweaveWalletLoaded', handleArWalletLoaded);
            window.arweaveWallet.disconnect();
        };
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