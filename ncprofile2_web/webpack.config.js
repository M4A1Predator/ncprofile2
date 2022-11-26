// ===========ESM==================
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';
// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/server.js',
  output: {
    filename: 'main.js',
    path: join(__dirname, '../dist'),
  },
  target: 'node',
  // plugins: [
	// 	new NodePolyfillPlugin()
	// ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map'
};


// const __dirname = dirname(fileURLToPath(import.meta.url));

// ===========CommonJS==================
// const path = require('path')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

// module.exports = {
//   entry: './src/server.js',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   target: 'node',
//   // plugins: [
// 	// 	new NodePolyfillPlugin()
// 	// ],
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ["@babel/transform-runtime"]
//           }
//         }
//       }
//     ]
//   },
//   devtool: 'source-map'
// };
