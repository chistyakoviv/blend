const gulp = require('gulp');

module.exports = function (taskName, pathName, options) {
    options = options || {};
    options.taskName = taskName;

    gulp.task(taskName, function(done) {
        let task = require(pathName);

        if (task.default) {
            task = task.default;
        }

        task = task.call(this, options);

        return task(done);
    });
};
