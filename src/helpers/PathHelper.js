import path from 'path';
import config from '../config/config';

let rootPath = process.cwd(); // path.resolve(__dirname, '')

class PathHelper {
    static setRootPath(newPath) {
        rootPath = newPath;
    }

    static root(append = '') {
        return path.resolve(rootPath, append);
    }

    static cutBeginning(occurance, str) {
        const re = new RegExp(`^\.?\/?${occurance}\/?`, 'gi');
        return str.replace(re, '');
    }

    static cutExtension(str) {
        const re = new RegExp(`\.[^.]+$`, 'gi');
        return str.replace(re, '');
    }

    static normalize(str) {
        return `${config.publicPath}/${PathHelper.cutBeginning(config.publicPath, str)}`;
    }
}

export default PathHelper;
