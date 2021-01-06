const webpack = require('webpack');
const path = require('path');
const gulplog = require('gulplog');
const AssetsPlugin = require('assets-webpack-plugin');
const config = require('../config/config');
const wpConfigFactory = require('../config/webpack.config');
const PathHelper = require('../helpers/PathHelper');
const babelConfigFactory = require('../config/babel.config');

const wpConfig = Object.assign(wpConfigFactory(), config.webpack);
const babelConfig = Object.assign(babelConfigFactory(), config.babelConfig);

module.exports = function() {

    wpConfig.module.rules.push(
        {
            test: /\.(cjs|mjs|jsx?|tsx?)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelConfig
                }
            ]
        }
    );

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

    return function(done) {console.log(!config.compile);
        if (Object.keys(config.compile).length === 0)
            return done();

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
