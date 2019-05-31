const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "./peter.yuan"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true
            }
          },
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          {
            loader: "postcss-loader"
          }
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    require("autoprefixer"),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 8000,
    host: "localhost",
    overlay: true,
    compress: true
  }
};
