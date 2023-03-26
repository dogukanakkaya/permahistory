import { type PermissionType } from 'arconnect';
import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { type ComponentChildren } from "preact";
import { useRouter } from 'preact-router';
import { APP_LOGO, APP_NAME } from '@/config';

interface Context {
    arConnectLoaded: boolean;
}

interface ContextProps {
    children: ComponentChildren;
}

const NEEDED_PERMISSIONS: PermissionType[] = ['SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'ACCESS_PUBLIC_KEY'];

const ArConnectContext = createContext<Context>({} as Context);

export const ArConnectProvider = (props: ContextProps) => {
    const [arConnectLoaded, setArConnectLoaded] = useState(false);
    const router = useRouter();

    const handleArWalletLoaded = () => setArConnectLoaded(true);

    const handleWalletConnection = async () => {
        if (router[0].path && ['/write'].includes(router[0].path)) {
            if (arConnectLoaded && window.arweaveWallet) {
                const permissions = await window.arweaveWallet.getPermissions();
                const missingPermissions = NEEDED_PERMISSIONS.filter(permission => !permissions.includes(permission));

                if (missingPermissions.length > 0) {
                    await window.arweaveWallet.connect(missingPermissions, {
                        name: APP_NAME,
                        logo: APP_LOGO
                    });
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener('arweaveWalletLoaded', handleArWalletLoaded);

        handleWalletConnection();

        return () => window.removeEventListener('arweaveWalletLoaded', handleArWalletLoaded);
    }, [router[0].path, arConnectLoaded]);

    return (
        <ArConnectContext.Provider value={{ arConnectLoaded }}>
            {props.children}
        </ArConnectContext.Provider>
    )
}

export default function useArConnect() {
    return useContext(ArConnectContext);
}