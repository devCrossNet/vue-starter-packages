import * as webpack from 'webpack';
import { merge, nodeExternals } from './utils';
import { baseServer } from './base-server';
import { packageRoot, runtimeRoot } from '../../utils/path';

export let devServer: webpack.Configuration = merge(baseServer, {
  entry: {
    'dev-server': packageRoot('dist/webpack/dev/server'),
  },
  output: {
    filename: 'dev-server.js',
  },
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },
}) as any;

devServer = require(runtimeRoot('.vue-starter/webpack.config')).devServerConfig(devServer);

export default devServer;
