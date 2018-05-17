exports.config = {
  namespace: 'stencil-state-tunnel',
  outputTargets:[
    {
      type: 'dist'
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
