//TODO: Add html linter https://www.npmjs.com/package/html-angular-validate
//TODO: Add less linter https://github.com/lesshint/lesshint
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

const srcPath    = path.join(__dirname, 'app');
const nodeEnv    = process.env.NODE_ENV;
const production = nodeEnv && nodeEnv.indexOf('prod') > -1;
const debug      = nodeEnv && nodeEnv.indexOf('debug') > -1;
const minify     = nodeEnv && nodeEnv.indexOf('minify') > -1;
const devTools   = !production || debug;

const dstPath    = production ? 'distrib' : 'build';
const fontsPath  = '/fonts/';
const imagesPath = '/images/';

const autoprefixer = require('autoprefixer')({ browsers: ['last 2 versions'] });
const common       = require(`${ srcPath }/vendors`);

const webpackConfig = module.exports = {
  target : 'web',
  //cache  : true,
  entry  : {
    module: path.join(srcPath, 'app.module.js'),
    common
  },
  resolve: {
    root      : srcPath,
    alias     : {
      components: 'components',
      styles    : 'components/styles'
    },
    extensions: ['', '.js'],

    modulesDirectories: ['node_modules', 'app']
  },
  output : {
    path      : path.join(__dirname, dstPath),
    publicPath: '',
    filename  : '[name].js'
  },

  module : {
    loaders: [
      {
        test   : /^((?!\.min).)*\.js$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate',
          'babel',
          'eslint'
        ]
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract([
          `css?minimize${ production ? '' : '&sourceMap' }`,
          'postcss'
        ])
      },
      {
        test  : /\.less$/,
        loader: ExtractTextPlugin.extract([
          `css?minimize${ production ? '' : '&sourceMap' }`,
          'postcss',
          `less${ production ? '' : '?sourceMap' }`
        ])
      },
      { //simple tpls will be accessible through html string
        test   : /^((?!tpl).)*\.html$/,
        loaders: ['html'],
        exclude: 'index.html'
      },
      { // templates through template cache
        test  : /\.tpl\.html$/,
        loader: `ngtemplate?relativeTo=${ (path.resolve(__dirname, './app')) }/!html`
      },
      {
        test  : /\.woff(\?.*)?$/,
        loader: `url?prefix=fonts/&name=${ fontsPath }[name].[ext]&limit=10000&mimetype=application/font-woff`
      },
      {
        test  : /\.woff2(\?.*)?$/,
        loader: `url?prefix=fonts/&name=${ fontsPath }[name].[ext]&limit=10000&mimetype=application/font-woff2`
      },
      {
        test  : /\.ttf(\?.*)?$/,
        loader: `url?prefix=fonts/&name=${ fontsPath }[name].[ext]&limit=10000&mimetype=application/octet-stream`
      },
      {
        test  : /\.eot(\?.*)?$/,
        loader: `file?prefix=fonts/&name=${ fontsPath }[name].[ext]`
      },
      {
        test  : /\.svg(\?.*)?$/,
        loader: `url-loader?&name=${ imagesPath }[name].[ext]&limit=10000&mimetype=image/svg+xml`
      },
      {
        test  : /\.(png|jpg)$/,
        loader: `url-loader?&name=${ imagesPath }[name].[ext]&limit=1024`
      }
    ],
    noParse: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject  : true,
      hash    : true,
      template: 'app/index.html'
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  postcss: () => [autoprefixer]
};

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.js');

commonChunkPlugin.__KARMA_IGNORE__ = true; //eslint-disable-line no-underscore-dangle
webpackConfig.plugins.push(commonChunkPlugin);


if (production || minify) {
  //Add minifying
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      unused   : true,
      dead_code: true
    }
  }));
}


if (devTools) {
  //Add debug tools
  Object.assign(webpackConfig, {
    debug    : true,
    devtool  : 'source-map',
    devServer: {
      contentBase       : `./${ dstPath }`,
      historyApiFallback: true,
      port              : 9000,
      proxy             : {
        '/api/*': {
          target: 'http://ecsd001000d7.epam.com:8080',
          rewrite(req) {
            req.url = req.url.replace(/^\/api/, '');
          }
        },
        '/local/*': {
          target: 'http://localhost:3000',
          rewrite(request) {
            request.url = request.url.replace(/^\/local/, '');
          }
        },
        '/mock/*': {
          target: 'http://beta.json-generator.com/api/json/get',
          rewrite(request) {
            request.url = request.url.replace(/^\/mock/, '');
          }
        }
      }
    }
  });
}
