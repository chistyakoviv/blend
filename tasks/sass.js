const path = require('path');
const config = require('../src/config/config');
const gulp = require('gulp');
const mergeStream = require('merge-stream');
const gp = require('gulp-load-plugins');

const plugins = gp();

module.exports = function(options) {

    return function(done) {

        if (config.sass.length === 0)
            return done();

        return mergeStream(...config.sass.map(item => {
            return gulp.src(item.source)
                .pipe(plugins.if(config.isDev, plugins.sourcemaps.init()))
                .pipe(plugins.sass())
                .on('error', plugins.notify.onError(function(err) {
                    return {
                        title: options.taskName,
                        message: err.message
                    };
                }))
                .pipe(plugins.if(config.autoprefixer, plugins.autoprefixer()))
                .pipe(plugins.if(config.isDev, plugins.sourcemaps.write('./maps')))
                .pipe(plugins.if(!config.isDev, plugins.cssnano()))
                .pipe(plugins.if(!config.isDev, plugins.rev()))
                .pipe(gulp.dest(item.destination ? path.resolve(config.publicPath, item.destination) : config.publicPath))
                .pipe(plugins.if(!config.isDev, plugins.rev.manifest('css.json')))
                .pipe(plugins.if(!config.isDev, gulp.dest(config.manifest)));
        }));
    };

};
