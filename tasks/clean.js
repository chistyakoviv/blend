import config from '../src/config/config';
import gulp from 'gulp';
import del from 'del';

function remove(resorces, done) {
    let counter = 0;

    resorces.forEach(resource => {
        del(resource, {
            force: true
        })
        .then(paths => {
            counter++;

            if (resorces.length === counter)
                done();
        });
    });
}

export default function(options) {

    return function(done) {
        remove(config.isDev ? [config.hotPath] : config.clean, done);
    };
};
