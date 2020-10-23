const path = require('path');
const gulp = require('gulp');
const mergeStream = require('merge-stream');
const PathHelper = require('../src/helpers/PathHelper');
const config = require('../src/config/config');

module.exports = function(options) {

    return function(done) {

        if (config.assets.length === 0)
            return done();

        return mergeStream(...config.assets.map(asset => {
            const destination = asset.destination ? path.resolve(config.publicPath, asset.destination) : config.publicPath;

            return gulp.src(asset.source)
                .pipe(gulp.dest(destination));
        }));
    };

};
