const config = {
    publicPath: 'public',
    hotPath: 'hot',
    manifest: 'manifest',

    deploy: {
        html: true
    },

    autoprefixer: true,

    compile: {},

    assets: [],
    clean: [],
    sass: [],
    html: [],

    watch: {
        sass: '',
        html: '',
        assets: ''
    },

    terser: {
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }
    },

    webpack: {},

    browserSync: {}
};

module.exports = config;
