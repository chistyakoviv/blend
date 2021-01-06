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

        entry: {},

        output: {
            path: path.resolve(config.publicPath),
            filename: config.isDev ? '[name].js' : '[name]-[chunkhash:10].js',
            chunkFilename: config.isDev ? '[name].js' : '[name]-[chunkhash:10].js',
            publicPath: '/'
        },

        watch: config.isDev,

        module: { rules: [] },

        plugins: [],

        stats: {
            hash: false,
            version: false,
            timings: false,
            children: false,
            errorDetails: false,
            entrypoints: false,
            performance: !config.isDev,
            chunks: false,
            modules: false,
            reasons: false,
            source: false,
            publicPath: false,
            builtAt: false
        },

        resolve: {
            extensions: ['.js', 'cjs', 'mjs', 'jsx']
        },

        performance: {
            hints: false
        },

        optimization: !config.isDev
            ? {
                  minimizer: [new TerserPlugin(config.terser)]
              }
            : {},

        devtool: config.isDev ? 'source-map' : false,
    };
};
