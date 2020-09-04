import gulp from 'gulp';
import config from '../src/config/config';

export default function(options) {

    return function() {

        for (let task in config.watch) {
            if (config.watch[task]) {
                gulp.watch(config.watch[task], gulp.series(task));
            }
        }

    };

};
