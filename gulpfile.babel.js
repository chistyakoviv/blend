import gulp from 'gulp';
import config from './src/config/config';
import blend from './src/Blend';
import lazyRequireTask from './src/lazyRequireTask'

config.isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

if (config.isDev) {
    blend.setPublicPath(config.hotPath);
}

require(blend.path());

gulp.task('default', function(done) {
    done();
});
