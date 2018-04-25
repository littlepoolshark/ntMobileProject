var path = require('path');
var autoprefixer = require('autoprefixer');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');
var pathToReactDOM = path.resolve(
  node_modules_dir,
  'react-dom/dist/react-dom.min.js'
);

const AUTOPREFIXER_BROWSERS = [
  'ie_mob >= 10',
  'ff >= 40',
  'chrome >= 40',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 2.3',
  'bb >= 10'
];

const AjaxHostMap = {
  // production: "/ci",
  development: '/nt244/ci'
  //development:"/nt245/ci",
  //development: "/nt239/ci"
  //development: '/ci'
  //development: 'http://192.168.1.76:8081/ci' //峰哥的本地服务器
};

module.exports = {
  entry: {
    //对应要运行的命令是：webpack-dev-sever --inline --hot
    app: [
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:1024',
      path.resolve(__dirname, 'app.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [node_modules_dir],
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: [
            'transform-object-rest-spread',
            'transform-react-jsx',
            'transform-object-assign',
            'transform-flow-strip-types'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|svg|ttf|otf)$/,
        loader: 'url?limit=25000'
      },
      {
        test: require.resolve('./src/js/lib/ajax'), //根据不用的环境来改变js变量（ajaxUrl）的值；
        loader:
          'imports-loader?ajaxHost=>' +
          JSON.stringify(AjaxHostMap[process.env.NODE_ENV || 'development'])
      }
    ],
    noParse: [pathToReact, pathToReactDOM] //每当webpack尝试去解析那个压缩后的文件，我们阻止它，因为这不必要
  },
  postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })], //使用postcss的插件autoprefixer来给css属性添加浏览器前缀
  watch: true,
  devServer: {
    contentBase: './'
    // proxy: {
    //     '/ci/*': {
    //         changeOrigin:true,
    //         target: 'http://192.168.1.26:9090',
    //         //host:"http://192.168.1.26:1024",
    //         secure: false
    //     }
    // }
  }
};
