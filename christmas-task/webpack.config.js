const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "./src/assets/icons/favicon.ico"
    }),
    new CopyPlugin({ patterns: [ 
      { 
        from: path.resolve(__dirname, './src/assets'), 
        to: path.resolve(__dirname, './dist/assets'),
      },
    ]}),
    new ESLintPlugin({
      extensions: ['.ts']
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/images/[name][ext]'
        },
      },
      {
        test: /\.(svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/icons/[name][ext]'
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/fonts/[name][ext]'
        },
      },
      {
        test: /\.mp3$/,
        include: path.resolve(__dirname, 'node_modules'),
        loader: 'file-loader'
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
