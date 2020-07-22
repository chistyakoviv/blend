import gulp from 'gulp';

export default function (taskName, pathName, options) {
    options = options || {};
    options.taskName = taskName;

    gulp.task(taskName, function(done) {
        const task = require(pathName).call(this, options);

        return task(done);
    });
};
