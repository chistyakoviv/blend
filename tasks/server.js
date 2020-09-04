import gulp from 'gulp';
import bs from 'browser-sync';
import config from '../src/config/config';
import configFactory from '../src/config/browserSync.config'

const browserSync = bs.create();
const bsConfig = Object.assign(configFactory(), config.browserSync);

export default function(options) {

    return function() {

        browserSync.init(bsConfig);
        browserSync.watch(`${config.publicPath}/**/*`).on('change', browserSync.reload);

    };

};
