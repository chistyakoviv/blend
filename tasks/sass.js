const path = require('path');
const config = require('../src/config/config');
const gulp = require('gulp');
const gp = require('gulp-load-plugins');

const plugins = gp();

module.exports = function(options) {

    return function(done) {

        if (config.sass.length === 0)
            return done();

        let stream;

        config.sass.forEach(item => {
            stream = gulp.src(item.source)
                .pipe(plugins.if(config.isDev, plugins.sourcemaps.init()))
                .pipe(plugins.sass())
                .on('error', plugins.notify.onError(function(err) {
                    return {
                        title: options.taskName,
                        message: err.message
                    };
                }));

            if (config.autoprefixer)
                stream.pipe(plugins.autoprefixer());

            stream
                .pipe(plugins.if(config.isDev, plugins.sourcemaps.write('./maps')))
                .pipe(plugins.if(!config.isDev, plugins.cssnano()))
                .pipe(plugins.if(!config.isDev, plugins.rev()))
                .pipe(gulp.dest(item.destination ? path.resolve(config.publicPath, item.destination) : config.publicPath))
                .pipe(plugins.if(!config.isDev, plugins.rev.manifest('css.json')))
                .pipe(plugins.if(!config.isDev, gulp.dest(config.manifest)));
        });

        return stream;
    };

};
