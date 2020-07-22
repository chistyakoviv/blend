import blend from './src/Blend';

blend
    .copy('examples/src/assets/**/*')
    .copy('examples/src/assets/**/*', 'examples/public');
