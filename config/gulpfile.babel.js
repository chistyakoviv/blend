import gulp from 'gulp';
import config from '../src/config/config';
import blend from '../src/blend';
import lazyRequireTask from '../lazyRequireTask'

config.isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

require(blend.path());

if (config.isDev) {
    blend.setPublicPath(config.hotPath);
}

lazyRequireTask('assets', './tasks/assets');
// lazyRequireTask('publish', './tasks/deploy');
lazyRequireTask('clean', './tasks/clean');
lazyRequireTask('html', './tasks/html');
lazyRequireTask('sass', './tasks/sass');

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('assets', 'sass'/*, 'webpack'*/),
    'html')
);

gulp.task('dev', gulp.series('build'));

gulp.task('deploy',
    gulp.series('build'/*, 'publish'*/)
);
