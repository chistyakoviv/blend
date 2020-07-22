import gulp from 'gulp';
import config from '../src/config/config';
import blend from '../src/Blend';
import lazyRequireTask from '../lazyRequireTask'

config.isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

require(blend.path());

if (config.isDev) {
    blend.setPublicPath(config.hotPath);
}

lazyRequireTask('assets', './tasks/assets');
lazyRequireTask('build:deploy', './tasks/build-deploy');

gulp.task('dev', gulp.series('assets'));

gulp.task('deploy',
    gulp.series(/*'clean:deployed', 'build', */'build:deploy')
);
