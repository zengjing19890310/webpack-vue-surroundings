let path = require('path'),
    // 获取webpack
    webpack = require('webpack'),
    // css js 分离插件
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    // html生成插件
    htmlWwebpackPlugin = require('html-webpack-plugin');

let webpackConfig = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        // 输出文件位置
        path: path.join(__dirname, 'dist'),
        // 文件名
        filename: 'index.js',
        // 绝对路径地址 放到服务器上时 使用
        publicPath: '',
    },
    // webpack-dev-server 配置
    devServer: {
        // 文件入口 可以在 http://localhost:8080/webpack-dev-server/index.html 访问 src/index.html文件
        contentBase: 'dist',
        // 当设置为true时，访问所有服务器上不存在的文件，都会被重定向到/，也就是index.html文件  也不知道是不是 感觉没什么卵用
        historyApiFallback: true,
        // 设为true时可以在文件发生变化时，更新页面
        inline: true,
        // 热更新
        hot: true,
        // 设置服务器端口 默认8080
        port: 8080,
        // 手机访问地址 本机ip地址加端口
        // 59.52.26.24:8080
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders:{
                        css: ExtractTextPlugin.extract({
                            loader: 'css-loader?minimize!sass-loader',
                            fallbackLoader: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js%/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?minimize!sass-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                // 如果文件小于8kb那么则用base64方式添加到页面中  大于8kb则放到name设置的文件夹中
                loader: 'url-loader?limit=8192&name=images/[hash:32].[ext]'
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[hash:32].[ext]'
            },
        ]
    },
    plugins: [
        // 设置css文件名
        new ExtractTextPlugin('index.css'),
        // html生成
        new htmlWwebpackPlugin({
            // 生成的html文件名
            filename: 'index.html',
            // 模板所在位置
            template: path.resolve(__dirname, 'src/Template.html'),
        }),
    ]
}

if ('production' === process.env.NODE_ENV) {
    // 压缩代码未完成
    // ERROR in index.js from UglifyJs
    // SyntaxError: Unexpected token punc «(», expected punc «:» [index.js:6318,8]
    // webpackConfig.plugins.push(
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: { warnings: false },
    //         output: { comments: false },
    //         sourceMap: true
    //     })
    // )
} else {
    // 在开发环境时显示更多信息
    webpackConfig.devtool = 'eval-source-map';
    webpackConfig.plugins.push(
        // html热加载插件
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = webpackConfig;