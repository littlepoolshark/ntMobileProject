var path=require("path");
var node_modules=path.resolve(__dirname,"node_modules");
var pathToReact=path.resolve(node_modules,"react/dist/react.min.js");
var pathToReactDOM=path.resolve(node_modules,"react-dom/dist/react-dom.min.js");
module.exports={
    entry:{//对应要运行的命令是：webpack-dev-sever --inline --hot
        app:['webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname,"app.js")]
    },
    output:{
        path:path.resolve(__dirname,"build"),
        filename:"[name].bundle.js"
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel-loader",
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
                loader:"style-loader!css-loader"
            },
            {
                test:/\.scss$/,
                loader:"style-loader!css-loader!sass-loader"
            },
            {
                test:/\.(png|jpg)$/,
                loader:"url?limit=25000"
            }
        ],
        noParse:[pathToReact,pathToReactDOM]//每当webpack尝试去解析那个压缩后的文件，我们阻止它，因为这不必要
    },
    watch: true,
    devServer:{
        contentBase:'./'
    }
}