var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require("webpack");

var app_environment = process.env.APP_ENV ? process.env.APP_ENV : 'development';
var node_environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

console.log('Application Environment: ' + app_environment)
console.log('Node Environment: ' + node_environment)
console.log()

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.' + app_environment + '.html',
  filename: 'index.html',
  inject: 'body',
  hash: true
});

module.exports = {
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.png$/, loader: "url-loader?limit=10000&minetype=image/png" },
      { test: /\.gif$/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.jpg$/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.less$/, loader: "style-loader!css-loader!postcss-loader!less-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=50000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?limit=50000" },
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(node_environment)
      }
    })
  ]
}
