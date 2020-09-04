import glob from 'glob';
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
        if (resource instanceof Array) {
            config.clean = [...config.clean, ...resource.map(occurrence => PathHelper.normalize(occurrence))];
        } else {
            config.clean = [...config.clean, PathHelper.normalize(resource)];
        }

        return this;
    }

    html(source, destination = '') {
        config.html.push({ source, destination });

        return this;
    }

    options(options) {
        Object.assign(config, options);

        return this;
    }

    sass(source, destination = '') {
        config.sass.push({ source, destination });

        return this;
    }

    js(entry, output = '') {
        if (typeof entry === 'string' && entry.includes('*')) {
            entry = glob.sync(entry);
        }

        output = PathHelper.cutExtension(output);
        entry = [].concat(entry).map(file => `./${file}`);

        if (!output) {
            output = entry[0];
        }

        config.compile[output] = entry;

        return this;
    }

    isDev() {
        return config.isDev;
    }
}

export default Api;
