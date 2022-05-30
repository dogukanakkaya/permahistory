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

    const handleArWalletLoaded = async () => {
        await window.arweaveWallet.connect(['SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'ACCESS_PUBLIC_KEY']);
        setArConnectLoaded(true);
    }

    useEffect(() => {
        window.addEventListener('arweaveWalletLoaded', handleArWalletLoaded);

        return () => window.removeEventListener('arweaveWalletLoaded', handleArWalletLoaded);
    }, [])

    return (
        <ArConnectContext.Provider value={{ arConnectLoaded }}>
            {props.children}
        </ArConnectContext.Provider>
    )
}

export default function useArConnect() {
    return useContext(ArConnectContext);
}