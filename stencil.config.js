exports.config = {
  enableCache: false,
  namespace: 'stencil-state-tunnel',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      dir: 'docs'
    }
  ]
};

exports.devServer = {
  root: 'docs',
  watchGlob: '**/**'
}
