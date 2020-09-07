const path = require('path');
const config = require('../src/config/config');
const gulp = require('gulp');
const PathHelper = require('../src/helpers/PathHelper');

module.exports = function(options) {

    return function(done) {

        let stream;

        config.assets.forEach(asset => {
            const destination = asset.destination ? asset.destination : config.publicPath;

            if (config.isDev && !destination.startsWith(config.publicPath))
                return;

            stream = gulp.src(asset.source)
                .pipe(gulp.dest(PathHelper.normalize(destination)));
        });

        return stream ? stream : done();
    };

};
