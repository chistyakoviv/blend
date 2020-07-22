import gulp from 'gulp';
import config from '../src/config/config';
import blend from '../src/Blend';
import lazyRequireTask from '../lazyRequireTask'

config.isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

if (config.isDev) {
    blend.setPublicPath(config.hotPath);
}

require(blend.path());

lazyRequireTask('assets', './tasks/assets');

gulp.task('default', gulp.series('assets'));
