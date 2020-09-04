const config = {
    publicPath: 'public',
    hotPath: 'hot',
    manifest: '',

    deploy: {
        html: true
    },

    autoprefixer: true,

    compile: {},

    assets: [],
    clean: [],
    sass: [],
    html: [],

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

    webpack: {}
};

export default config;
