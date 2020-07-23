import config from '../src/config/config';
import gulp from 'gulp';
import gp from 'gulp-load-plugins';

const plugins = gp();

export default function(options) {

    return function(done) {

        if (config.html.length === 0)
            return done();

        let stream;

        config.html.forEach(path => {
            // determine basepath by removing end part
            const basepath = path.split('/');
            basepath.pop();

            stream = gulp.src(path)
                .pipe(plugins.fileInclude({
                    prefix: '@@',
                    basepath: basepath.join('/')
                }))
                .pipe(plugins.if(!config.isDev, plugins.revReplace({
                    manifest: gulp.src('manifest/css.json', { allowEmpty: true })
                })))
                .pipe(gulp.dest(config.publicPath));
        });

        return stream;
    };

};