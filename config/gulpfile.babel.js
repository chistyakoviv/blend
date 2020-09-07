const gulp = require('gulp');
const config = require('../src/config/config');
const blend = require('../src/blend');
const lazyRequireTask = require('../lazyRequireTask');

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
