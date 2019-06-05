const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'main.es2015.js',
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
          configFile: 'tsconfig.es2015.json'
        }
      }
    ]
  }
}
