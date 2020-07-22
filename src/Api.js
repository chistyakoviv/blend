import config from './config/config';
import PathHelper from './helpers/PathHelper';

class Api {
    setPublicPath(newPath) {
        config.publicPath = newPath;

        return this;
    }

    copy(source, destination = '') {
        config.assets.push({ source, destination });

        return this;
    }

    path() {
        return PathHelper.root('blend.config');
    }
}

export default Api;
