import config from '../src/config/config';
import gulp from 'gulp';
import gp from 'gulp-load-plugins';

export default function(options) {

    return function(done) {

        config.assets.forEach(asset => {
            gulp.src(asset.source, { since: gulp.lastRun(options.taskName) })
                .pipe(gulp.dest(asset.destination ? asset.destination : config.publicPath));
        });

        return done();
    };

};
