var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    //页面入口文件配置
    entry: {
        index: './src/js/index.js',
        page2: './src/js/page2.js'
    },
    //出口文件输出配置
    output: {
        path: './dist', //输出的路径
        filename: 'js/[name].js',  //输出测主js文件
        chunkFilename: 'js/[id].chunk.js'
    },

    module: {
        //加载器
        //"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            // 转化ES6的语法
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
            //如下配置，将小于8192byte的图片转成base64码
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'}
        ]
    },
    plugins: [
        //提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
        new webpack.optimize.CommonsChunkPlugin('js/common.js'),
        new ExtractTextPlugin('css/[name].css'),
        // new ExtractTextPlugin('css/style.css'),
        //HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './index.html', //生成的html存放路径，相对于path
            template: './src/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['js/common.js', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './page2.html', //生成的html存放路径，相对于path
            template: './src/page2.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['js/common.js', 'page2'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.HotModuleReplacementPlugin() //热加载

    ],
    // 转化成es5的语法
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        //查找module的话从这里开始查找
        root: './', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {}
    },
    devServer: {
        contentBase: './',
        host: '127.0.0.1',
        port: 8888, //默认8080
        inline: true, //可以监控js变化
        hot: true //热启动
    }

};

module.exports = config;