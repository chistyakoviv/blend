import config from './config';

export default function() {
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
