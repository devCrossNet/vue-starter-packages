import * as webpack from 'webpack';
import { merge, nodeExternals } from './utils';
import { baseServer } from './base-server';
import { runtimeRoot } from '../../utils/path';

const VueSSRPlugin = require('vue-ssr-webpack-plugin');

export let isomorphic: webpack.Configuration = merge(baseServer, {
  entry: { isomorphic: runtimeRoot('src/server/isomorphic') },
  output: {
    filename: 'isomorphic.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  plugins: [new VueSSRPlugin({})],
}) as any;

isomorphic = require(runtimeRoot('.vue-starter/webpack.config')).isomorphicConfig(isomorphic);

export default isomorphic;
