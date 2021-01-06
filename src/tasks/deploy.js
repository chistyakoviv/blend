const config = require('../config/config');
const gulp = require('gulp');
const del = require('del');

module.exports = function(options) {

    return function() {

        if (config.manifest) {
            gulp.src('manifest/*', { allowEmpty: true })
                .pipe(gulp.dest(config.manifest));
        }

        const src = [`${config.hotPath}/**/*`];

        if (!config.deploy.html) {
            src.push(`!${config.hotPath}/**/*.html`);
        }

        return gulp.src(src, { allowEmpty: true })
            .pipe(gulp.dest(config.publicPath));
    }
};