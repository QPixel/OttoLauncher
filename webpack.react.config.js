/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "./public/index.html"),
  filename: "index.html"
})


module.exports = {
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
    mainFields: [ "main", "module", "browser" ],
  },
  entry: "./src/ui/index.tsx",
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: [ {
          loader: "file-loader",
          options: {}
        } ]
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist/renderer"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8000,
    publicPath: "/",
  },
  output: {
    path: path.resolve(__dirname, "../dist/renderer"),
    filename: "js/[name].js",
    publicPath: "./",
  },
  plugins: [
    HtmlPlugin
  ],
};