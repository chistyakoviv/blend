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

    manifest(path) {
        config.manifest = path;

        return this;
    }

    clean(resource) {
        if (resource instanceof Array)
            config.clean = [...config.clean, ...resource];
        else
            config.clean = [...config.clean, resource];

        return this;
    }

    isDev() {
        return config.isDev;
    }
}

export default Api;
