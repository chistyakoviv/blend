import blend from './src/Blend';

blend
    .clean([
        'public_html/js/app*',
        'public_html/css',
        'public_html/images',
        'public_html/files',
    ])
    .copy('examples/src/assets/**/*')
    .copy('examples/src/assets/**/*', 'examples/public')
    .manifest('examples/manifest');
