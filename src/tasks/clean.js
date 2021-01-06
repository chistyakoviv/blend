const config = require('../config/config');
const gulp = require('gulp');
const del = require('del');

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

module.exports = function(options) {

    return function(done) {
        if (!config.isDev && config.clean.length === 0)
            return done();

        remove(config.isDev ? [config.hotPath] : config.clean, done);
    };
};
