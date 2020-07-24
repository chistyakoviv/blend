import fs from 'fs';
import path from 'path';
import config from '../src/config/config';
import gulp from 'gulp';
import gp from 'gulp-load-plugins';

const plugins = gp();

function resolveManifest() {
    let css = {}, js = {}, combined = {};

    try {
        css = JSON.parse(fs.readFileSync('./manifest/css.json'));
    } catch(err) {}

    try {
        js = JSON.parse(fs.readFileSync('./manifest/webpack.json'));
    } catch(err) {}

    Object.assign(combined, css, js);

    for (let i in combined) {
        const clean = i.replace('.', '');

        if (clean !== i) {
            combined[clean] = combined[i];
            delete combined[i];
        }
    }

    return combined;
}

export default function() {

    return function(done) {

        if (config.html.length === 0)
            return done();

        if (!config.isDev && !config.deploy.html)
            return done();

        let stream;

        config.html.forEach(item => {

            stream = gulp.src(item.source)
                .pipe(plugins.fileInclude({
                    prefix: '@@'
                }))
                .pipe(gulp.dest(item.destination ? path.resolve(config.publicPath, item.destination) : config.publicPath));
        });

        return stream;
    };

};