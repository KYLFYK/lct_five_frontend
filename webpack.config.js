const path = require('path');
const webpackConfig = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// require('dotenv').config({ path: `.env.${process.env.ENV}` });

const CURRENT_ENV = process.env.ENV;
const isDocsRoot = process.env.FOLDER === 'docs';

const IS_PRODUCTION = CURRENT_ENV === 'production';

const plugins = [
  new webpackConfig.DefinePlugin({
    process: {
      env: {
        NODE_ENV: JSON.stringify(CURRENT_ENV),
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    publicPath: '/lct_five_frontend',
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.join(
          __dirname,
          'node_modules/@kylfyk/plai_player',
          'dist/models'
        ),
        to: path.resolve(__dirname, isDocsRoot ? 'docs/models' : 'dist/models'),
      },
      {
        from: path.join(
          __dirname,
          'node_modules/@kylfyk/plai_player',
          'dist/321.index.js'
        ),
        to: path.resolve(
          __dirname,
          isDocsRoot ? 'docs/321.index.js' : 'dist/321.index.js'
        ),
      },
    ],
  }),
];

module.exports = {
  mode: CURRENT_ENV,
  plugins,
  entry: {
    index: path.join(__dirname, 'src', 'index.tsx'),
  },
  optimization: {
    usedExports: true,
    removeEmptyChunks: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
          usedExports: true,
        },
      },
    },
  },
  devtool: IS_PRODUCTION ? false : 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, isDocsRoot ? 'docs' : 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/[ext][query]',
    clean: true,
    publicPath: '/lct_five_frontend',
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'video',
            },
          },
        ],
      },
      {
        test: /\.(bin|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },
};
