const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const DevServer = {
  port: 9000,
  open: ["/"],
  historyApiFallback: true,
  hot: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    progress: true,
  },
};

const BaseConfig = {
  mode: "none",
  entry: {
    singleFile2Trilium: ["./src/index.tsx"],
  },
  devtool: "eval-source-map",
  output: {
    path: path.resolve(path.join(__dirname, "dist")),
    filename: "[contenthash:6].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: ["/node_modules/"],
        resolve: {
          extensions: [".ts", ".js"],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: ["/node_modules/"],
        resolve: {
          extensions: [".ts", ".js", ".tsx"],
        },
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "SingleFile2Trilium",
      filename: "index.html",
      template: path.resolve(path.join(__dirname, "src", "index.html")),
    }),
  ],
};

module.exports = (env, argv) => {
  let config = { ...BaseConfig };
  if (argv.mode === "development") {
    config.mode = "development";
    config.devtool = "eval-source-map";
    config.devServer = { ...DevServer };
  } else if (argv.mode === "production") {
    config.mode = "production";
    config.optimization = {
      ...config.optimization,
      ...{
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: true,
            },
          }),
        ],
      },
    };
  }
  return config;
};
