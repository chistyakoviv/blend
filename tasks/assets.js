import config from './src/config';
import gulp from 'gulp';
import gp from 'gulp-load-plugins';

export default function(options) {

    return function(done) {

        config.assets.forEach(asset => {
            gulp.src(asset.source, { since: gulp.lastRun(options.taskName) })
                .pipe(gulp.dest(asset.destination ? asset.destination : config.publicPath));
        });

        return done();

        return  gulp// .pipe(gp().newer(options.dest))
            .pipe(gulp.dest(config.publicPath));
    };

};
