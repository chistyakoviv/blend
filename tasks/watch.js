const gulp = require('gulp');
const config = require('../src/config/config');

module.exports = function(options) {

    return function() {

        for (let task in config.watch) {
            if (config.watch[task]) {
                gulp.watch(config.watch[task], gulp.series(task));
            }
        }

    };

};
