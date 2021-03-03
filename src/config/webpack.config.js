const path = require('path');
const fs = require('fs');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./config');
const PathHelper = require('../helpers/PathHelper');

module.exports = function() {
    return {
        context: PathHelper.root(),

        mode: config.isDev ? 'development' : 'production',

        infrastructureLogging: config.isDev ? { level: 'none' } : {},

        entry: {},

        output: {
            path: path.resolve(config.publicPath),
            filename: config.isDev ? '[name].js' : '[name]-[chunkhash:10].js',
            chunkFilename: config.isDev ? '[name].js' : '[name]-[chunkhash:10].js',
            publicPath: '/',
            // support for ie 10+
            environment: {
                // The environment supports arrow functions ('() => { ... }').
                arrowFunction: false,
                // The environment supports BigInt as literal (123n).
                bigIntLiteral: false,
                // The environment supports const and let for variable declarations.
                const: false,
                // The environment supports destructuring ('{ a, b } = obj').
                destructuring: false,
                // The environment supports an async import() function to import EcmaScript modules.
                dynamicImport: false,
                // The environment supports 'for of' iteration ('for (const x of array) { ... }').
                forOf: false,
                // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
                module: false,
            }
        },

        watch: config.isDev,

        watchOptions: {
            ignored: /node_modules/
        },

        module: { rules: [] },

        plugins: [],

        resolve: {
            extensions: ['*', '.wasm', '.mjs', '.js', '.json']
        },

        stats: {
            preset: 'errors-warnings',
            performance: !config.isDev
        },

        performance: {
            hints: false
        },

        optimization: !config.isDev
            ? {
                providedExports: true,
                sideEffects: true,
                usedExports: true,
                minimizer: [new TerserPlugin(config.terser)]
              }
            : {},

        devtool: config.isDev ? 'source-map' : false,
    };
};
