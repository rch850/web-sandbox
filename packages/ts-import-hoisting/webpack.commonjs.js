const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'main.commonjs.js',
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.commonjs.json'
        }
      }
    ]
  }
}
