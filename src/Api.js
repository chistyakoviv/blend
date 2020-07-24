import glob from 'glob';
import path from 'path';
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

    html(source, destination = '') {
        config.html.push({ source, destination });

        return this;
    }

    deploy(options) {
        Object.assign(config.deploy, options);

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

        output = output.startsWith(config.publicPath) ? output.slice(config.publicPath.length) : output;
        entry = [].concat(entry).map(file => file.startsWith('./') ? file : `./${file}`);

        if (!output)
            output = entry[0];
console.log(config.publicPath);
        config.compile[output] = entry;

        return this;
    }

    isDev() {
        return config.isDev;
    }
}

export default Api;
