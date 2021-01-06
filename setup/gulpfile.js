const gulp = require('gulp');
const config = require('../src/config/config');
const blend = require('../src/blend');
const lazyRequireTask = require('../lazyRequireTask');

config.isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

require(blend.path());

if (config.isDev) {
    blend.setPublicPath(config.hotPath);
}

lazyRequireTask('assets', './src/tasks/assets');
lazyRequireTask('clean', './src/tasks/clean');
lazyRequireTask('html', './src/tasks/html');
lazyRequireTask('sass', './src/tasks/sass');
lazyRequireTask('webpack', './src/tasks/webpack');
lazyRequireTask('server', './src/tasks/server');
lazyRequireTask('watch', './src/tasks/watch');

const taskList = ['clean', gulp.parallel('assets', 'sass', 'webpack'), 'html'];

if (config.isDev) {
    taskList.push(gulp.parallel('server', 'watch'));
}

gulp.task('build', gulp.series(...taskList));
