const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const gulplog = require('gulplog');
const AssetsPlugin = require('assets-webpack-plugin');
const config = require('../src/config/config');
const configFactory = require('../src/config/webpack.config');
const PathHelper = require('../src/helpers/PathHelper');

const wpConfig = Object.assign(configFactory(), config.webpack);

module.exports = function() {

    if (!config.isDev) {
        wpConfig.plugins.push(
            new AssetsPlugin({
                filename: 'webpack.json',
                path: path.resolve(PathHelper.root(), config.manifest),
                processOutput(assets) {
                    for (let key in assets) {
                        if (assets[key].js) {
                            assets[`${key}.js`] = assets[key].js.slice(wpConfig.output.publicPath.length);
                            delete assets[key];
                        }
                    }

                    return JSON.stringify(assets);
                }
            })
        );
    }

    wpConfig.entry = config.compile;

    return function(done) {
        webpack(wpConfig, function(err, stats) {
            if (!err) { // if no hard error
                // then try to get soft error
                err = stats.toJson().errors[0];
            }

            if (err) {
                gulplog.error(err);
            } else {
                gulplog.info(stats.toString({
                    colors: true
                }));
            }

            if (!wpConfig.watch && err) {
                done(err);
            } else {
                done();
            }
        });
    };
}
