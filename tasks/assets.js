import path from 'path';
import config from '../src/config/config';
import gulp from 'gulp';
import PathHelper from '../src/helpers/PathHelper';

export default function(options) {

    return function(done) {

        let stream;

        config.assets.forEach(asset => {
            const destination = asset.destination ? asset.destination : config.publicPath;

            if (config.isDev && !destination.startsWith(config.publicPath))
                return;

            stream = gulp.src(asset.source, { since: gulp.lastRun(options.taskName) })
                .pipe(gulp.dest(PathHelper.normalize(destination)));
        });

        return stream ? stream : done();
    };

};
