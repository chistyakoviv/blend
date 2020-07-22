import path from 'path';

let rootPath = process.cwd(); // path.resolve(__dirname, '')

class PathHelper {
    static setRootPath(newPath) {
        rootPath = newPath;
    }

    static root(append = '') {
        return path.resolve(rootPath, append);
    }
}

export default PathHelper;
