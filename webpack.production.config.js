var webpack=require("webpack");
var path=require("path");
var autoprefixer=require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules_dir=path.resolve(__dirname,"node_modules");
var pathToReact=path.resolve(node_modules_dir,"react/dist/react.min.js");
var pathToReactDOM=path.resolve(node_modules_dir,"react-dom/dist/react-dom.min.js");

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

module.exports={
    devtool: false,
    entry:{//对应要运行的命令是：webpack-dev-sever --inline --hot
        app:path.resolve(__dirname,"app_production.js"),
        vendor:["react","react-dom","react-router"] //基于类库代码的变动性和浏览器缓存策略，将外部提供的类库提取出来整合一个chunk
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].[chunkhash:8].bundle.js",
        chunkFilename: '[id].chunk.js',
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude: [node_modules_dir],
                "query":{
                    presets:["es2015","stage-0"],
                    plugins:[
                        "transform-object-rest-spread",
                        "transform-react-jsx",
                        "transform-object-assign"
                    ]
                }
            },
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test:/\.scss$/,
                loader:ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader!sass-loader")
            },
            {
                test:/\.(png|jpg|woff|svg|ttf)$/,
                loader:"url?limit=25000"
            }
        ],
        noParse:[pathToReact,pathToReactDOM]//每当webpack尝试去解析那个压缩后的文件，我们阻止它，因为这不必要
    },
    postcss: [ autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }) ],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
    plugins:[
        new ExtractTextPlugin("[name].[chunkhash:8].css"),
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor.[chunkhash:8].bundle.js"),
        new webpack.optimize.UglifyJsPlugin({//压缩
            compress:{
                warnings:false
            }
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:path.resolve(__dirname,"index_production.html"),
            inject:true,
            chunks:["app","vendor"]
        }),
        new webpack.DefinePlugin({//Tell Webpack to use Node's production environment
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}