import path from 'path';
import fs from 'fs';
import AssetsPlugin from 'assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import config from './config';
import PathHelper from '../helpers/PathHelper';

export default function() {
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
