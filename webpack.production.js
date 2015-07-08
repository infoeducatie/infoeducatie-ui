var webpack = require("webpack");

/**
 * This is the Webpack configuration file for production.
 */
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
      { test: /\.less$/, loader: "style!css!autoprefixer-loader!less" },
      { test: /\.css$/, loader: "style!css!autoprefixer-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=50000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?limit=50000" },
    ]
  },

  resolve: {
    extensions: ["", ".js", ".jsx"]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}
