const path = require('path');
const gulp = require('gulp');
const mergeStream = require('merge-stream');
const PathHelper = require('../helpers/PathHelper');
const config = require('../config/config');

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
