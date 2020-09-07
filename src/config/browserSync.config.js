const config = require('./config');

module.exports = function() {
    return {
        port: 3017,
        server: {
            baseDir: config.publicPath
        },
        watchOptions: {
            awaitWriteFinish : true
        }
    };
};
