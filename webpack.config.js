const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/makeLexerClass',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'makeLexerClass.js',
    library: 'makeLexerClass',
    libraryTarget: 'umd'
  },
  optimization: {
    // minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { 'loose': true }]
            ]
          }
        }
      }
    ]
  }
}
