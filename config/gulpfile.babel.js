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
lazyRequireTask('clean', './tasks/clean');
lazyRequireTask('html', './tasks/html');
lazyRequireTask('sass', './tasks/sass');
lazyRequireTask('webpack', './tasks/webpack');
lazyRequireTask('server', './tasks/server');
lazyRequireTask('watch', './tasks/watch');

const taskList = ['clean', gulp.parallel('assets', 'sass', 'webpack'), 'html'];

if (config.isDev) {
    taskList.push(gulp.parallel('server', 'watch'));
}

gulp.task('build', gulp.series(...taskList));
