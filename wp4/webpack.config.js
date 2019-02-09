const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); //访问内置插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log(path.resolve(__dirname, 'dist'))

let config = {
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.[hash:10].js', //打包后的文件名
        path: path.resolve(__dirname, 'dist'), //必须是一个绝对路径
        // publicPath: 'http://wy.com'
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: 'style-loader', //将css插入到head标签中
            //             options: {
            //                 insertAt: 'top'
            //             }
            //         },
            //         'css-loader' //解析@import语法
            //     ]
            // },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader', //将css插入到head标签中
                        options: {
                            insertAt: 'top',
                            sourceMap: true
                        }
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // 'css-loader', //解析@import语法
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    'browsers': ['>1%', 'last 2 versions']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                //做限制 当图片小于多少k时，用base64转化
                //否则用file-loader
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: './img/',
                        // publicPath: 'http://wy.com' //导致图片请求失败 http://wy.com -> www.weyerhaeuser.com
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: require.resolve('jquery'),  //将jquery暴露给全局，window.$可以拿到jquery
                loader: 'expose-loader?$!expose-loader?jQuery'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {'legacy': true}],
                            ['@babel/plugin-proposal-class-properties', {'loose': true}]
                        ]
                    }
                }
            },
            // {  //与htmlWebpackPlugin冲突
            //     test: /\.html$/,
            //     use: 'html-withimg-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename: path.join(__dirname, 'index/index.html'),
            template: './src/index.tpl.html',
            favicon: path.resolve(__dirname, './src/logo.png'),
            inject: 'body',
            minify: {
                removeComments: true, //移除html中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        // new webpack.ProvidePlugin({  //全局注入jquery，注意window.$为undefined
        //     $: 'jquery'
        // })
        new CopyWebpackPlugin([
            {from: './test', to: './test'}
        ]),
        new webpack.BannerPlugin('make in 2019 by wy')
    ],
    mode: 'development', //模式 development,production,none
    devServer: { //开发服务器配置
        port: 8888,
        // progress: true, //进度条
        // contentBase: '',
        // open: true,
        //**** 代理 */
        // proxy: {
        //     // '/api': 'http://localhost:9978'
        //     '/api': {
        //         target: 'http://localhost:9978',
        //         pathRewrite: {'/api': ''}
        //     }
        // }
        //******前端模拟数据 */
        before (app) { //devserver的Express执行对象
            app.get('/user', (req, res) => {
                res.json({name: 'test'})
            })
        }
        //**使用中间件： 如server.js */
    },
    optimization: { //优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    externals: { //引入外部库并且不让webpack打包
        // jquery: "$"
    },
    resolve: { //解析第三方包 (import)
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.css', '.json'], //拓展名顺序
        // mainFields: ['style', 'main'], //先找包里面的style字段，再找main
        // mainFiles: [], //入口文件的名字 index.js
        alias: { //别名 方便引入
            zui: 'zui/dist/css/zui.min.css'
        }
    }
}

module.exports = (env, argv, a, b) => {
    debugger;
    console.log('env:' + env);
    console.log('argv:' + argv);
    return config;
};