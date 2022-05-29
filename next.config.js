const removeImports = require('next-remove-imports')();

const nextConfig = {
    reactStrictMode: true,
    assetPrefix: '.',
    images: { loader: 'custom' },
};

module.exports = {
    ...removeImports({}),
    ...nextConfig
}