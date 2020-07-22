import config from '../src/config/config';
import gulp from 'gulp';

export default function(options) {

    return function() {

        if (config.manifest) {
            gulp.src('manifest/*', { allowEmpty: true })
                .pipe(gulp.dest(config.manifest));
        }

        return gulp.src([`${config.hotPath}/**/*`, `!${config.hotPath}.html`], { allowEmpty: true })
            .pipe(gulp.dest(config.publicPath));
    }
};