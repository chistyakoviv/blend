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
                '@babel/plugin-proposal-class-properties',
                {
                    // When true, class properties are compiled to use an assignment expression instead of Object.defineProperty.
                    // See https://2ality.com/2012/08/property-definition-assignment.html for details.
                    loose: false
                }
            ],
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: false
                }
            ]
        ]
    };
};
