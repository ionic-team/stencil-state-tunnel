exports.config = {
  enableCache: false,
  namespace: 'stencil-state-tunnel',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www'
    },
    {
      type: 'www',
      dir: 'docs',
      baseUrl: '/stencil-state-tunnel'
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
