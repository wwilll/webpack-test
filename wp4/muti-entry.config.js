let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    //源码映射 会单独生成一个sourcemap文件，出错会标识当前报错列和行
    // devtool: 'source-map',
    //不产生单独文件，可显示报错列和行
    // devtool: 'eval-source-map',
    //产生一个单独文件，但不会定位列
    // devtool: 'cheap-module-source-map',
    //不产生文件，不定位列
    // devtool: 'cheap-module-eval-source-map',
    watch: true, //自动打包
    watchOptions: {
        poll: 1000, //每秒询问 1000次
        aggregateTimeout: 500, //防抖 输入间隔500ms内不打包
        ignored: /node_modules/  //忽略监控
    },
    entry: {
        home: './muti/index.js',
        other: './muti/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'muti-dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './muti/index.html',
            filename: 'index.html',
            favicon: path.resolve(__dirname, './src/logo.png'),
            inject: 'body',
            chunks: ['home', 'other']
        }),
        new HtmlWebpackPlugin({
            template: './muti/other.html',
            filename: 'other.html',
            favicon: path.resolve(__dirname, './src/logo.png'),
            inject: 'body',
            chunks: ['other']
        }),
        new CleanWebpackPlugin(['muti-dist'])
    ]
}