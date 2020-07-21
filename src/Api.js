import config from './src/config/config';

class Api {
    setPublicPath(newPath) {
        config.publicPath = newPath;

        return this;
    }

    copy(source, destination) {

    }
}

export default Api;
