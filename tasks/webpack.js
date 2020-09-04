import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import gulplog from 'gulplog';
import AssetsPlugin from 'assets-webpack-plugin';
import config from '../src/config/config';
import configFactory from '../src/config/webpack.config';
import PathHelper from '../src/helpers/PathHelper'

const wpConfig = Object.assign(configFactory(), config.webpack);

export default function() {

    if (!config.isDev) {
        wpConfig.plugins.push(
            new AssetsPlugin({
                filename: 'webpack.json',
                path: path.resolve(PathHelper.root(), config.manifest),
                processOutput(assets) {
                    for (let key in assets) {
                        if (assets[key].js) {
                            assets[key + '.js'] = assets[key].js.slice(wpConfig.output.publicPath.length);
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
            // fs.writeFileSync(path.join(__dirname, "../stats.json"), JSON.stringify(stats.toJson()));

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
