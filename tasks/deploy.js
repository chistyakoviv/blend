import config from '../src/config/config';
import gulp from 'gulp';
import del from 'del';

export default function(options) {

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