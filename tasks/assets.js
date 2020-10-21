const path = require('path');
const config = require('../src/config/config');
const gulp = require('gulp');
const PathHelper = require('../src/helpers/PathHelper');

module.exports = function(options) {

    return function(done) {

        let stream;

        config.assets.forEach(asset => {
            const destination = asset.destination ? path.resolve(config.publicPath, asset.destination) : config.publicPath;

            stream = gulp.src(asset.source)
                .pipe(gulp.dest(destination));
        });

        return stream ? stream : done();
    };

};
