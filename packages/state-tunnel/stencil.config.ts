import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  enableCache: false,
  namespace: 'stencil-state-tunnel',
  outputTargets: [
    {
      type: 'dist'
    }
  ]
};
