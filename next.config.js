const removeImports = require('next-remove-imports')();

const nextConfig = {
    reactStrictMode: true,
    images: { loader: 'custom' },
    trailingSlash: true
};

if (process.env.NODE_ENV === 'static_export') {
    nextConfig.assetPrefix = 'http://127.0.0.1:5500/out';
    nextConfig.basePath = '/out';
} else if (process.env.NODE_ENV === 'production') {
    nextConfig.assetPrefix = '.';
}

module.exports = {
    ...removeImports({}),
    ...nextConfig
}