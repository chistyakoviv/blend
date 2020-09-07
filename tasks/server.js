const gulp = require('gulp');
const bs = require('browser-sync');
const config = require('../src/config/config.js');
const configFactory = require('../src/config/browserSync.config');

const browserSync = bs.create();
const bsConfig = Object.assign(configFactory(), config.browserSync);

module.exports = function(options) {

    return function() {

        browserSync.init(bsConfig);
        browserSync.watch(`${config.publicPath}/**/*`).on('change', browserSync.reload);

    };

};
