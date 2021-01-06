const fs = require('fs');
const PathHelper = require('../helpers/PathHelper');

module.exports = function() {
    return {
        cacheDirectory: true,
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    forceAllTransforms: true
                }
            ]
        ],
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: false
                }
            ]
        ]
    };
};