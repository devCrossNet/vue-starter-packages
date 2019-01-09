import * as webpack from 'webpack';
import { merge } from './utils';
import { base } from './base';
import { runtimeRoot } from '../../utils/path';

export let baseServer: webpack.Configuration = merge(base, {
  target: 'node',
  output: {
    path: runtimeRoot('dist/server'),
    libraryTarget: 'commonjs',
  },
  plugins: [
    new webpack.DefinePlugin({
      CLIENT: false,
      SERVER: true,
      nodeRequire: 'function(module){return require(module);}',
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
}) as any;

baseServer = require(runtimeRoot('.vue-starter/webpack.config'))(baseServer, 'server');

export default baseServer;
