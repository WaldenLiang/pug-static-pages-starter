const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/js/main.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js?[chunkhash]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        use: ['html-loader', {
          loader: 'pug-html-loader',
          options: {
            data: {}
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'media/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: false,
    liveReload: true,
    open: true,
    progress: true,
    watchContentBase: true,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css?[hash]',
      chunkFilename: 'css/[id].css?[hash]'
    })
  ].concat(_gatherTemplate())
}

function _gatherTemplate () {
  const files = glob.sync('./src/pages/*.pug')
  return files.map(file => {
    const chunkName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))
    return new HtmlWebpackPlugin({
      filename: `${chunkName}.html`,
      template: file,
      inject: true,
      chunks: [chunkName, 'main', 'vendor'],
      minify: false
    })
  })
}
