exports.config = {
  enableCache: false,
  namespace: 'stencil-state-tunnel',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www'
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
