import logo from './public/logo-transparent-text-dark.svg';

const config = {
    APP_NAME: 'Permahistory.v2-dev',
    APP_LOGO: logo.src,
    ARCONNECT_ENCRYPT_OPTIONS: {
        algorithm: "RSA-OAEP",
        hash: "SHA-256",
    },
    // ARWEAVE_HOST: '127.0.0.1',
    // ARWEAVE_PORT: 1984,
    // ARWEAVE_PROTOCOL: 'http',
    // ARWEAVE_URL: 'http://127.0.0.1:1984'
    ARWEAVE_HOST: 'arweave.net',
    ARWEAVE_PORT: 443,
    ARWEAVE_PROTOCOL: 'https',
    ARWEAVE_URL: 'https://arweave.net:443'
};

export default config;