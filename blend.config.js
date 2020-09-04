import blend from './src/blend';

blend
    .setPublicPath('public_html')
    .options({ deploy: { html: false } })
    .clean([
        'public_html/js/app*',
        'public_html/css',
        'public_html/images',
        'public_html/files',
    ])
    .copy('examples/src/assets/**/*')
    .copy('examples/src/assets/**/*', 'examples/public')
    .html('examples/src/html/[^^_]*.html')
    .sass('examples/src/sass/combined.scss', 'css')
    .js('examples/src/js/Application.js', 'js/app.js')
    .manifest('examples/manifest');
