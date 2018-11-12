const path = require("path")
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetPlugin = require("optimize-css-assets-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        mainFields: ['loader', 'main']
    },
    entry: {
        // main: ["core-js/fn/promise", "./src/main.js"]
        main: ["./index.js"]
    },
    mode: "production",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "./dist/main"),

    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                        loader: "babel-loader"
                    },

                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCSSExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"

                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            keepQuery: true,

                        }
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [{
                        loader: MiniCSSExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"

                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=../fonts/[name].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=../fonts/[name].[ext]'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=../fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=../fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=../fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: "pug-loader"
                }]
            },
            {
                test: /\.hbs$/,
                use: [{
                    loader: "handlebars-loader",
                    query: {
                        inlineRequires: "/images"
                    }
                }]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=../images/[name].[ext]'
                    // use: [{
                    //     loader: "file-loader",
                    //     options: {
                    //         name: "[name].[ext]",

                //     }
                // }]

            }
        ]
    },
    plugins: [
        new OptimizeCSSAssetPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new MiniCSSExtractPlugin(),
        new HTMLWebpackPlugin({
            template: "./home.html",
            title: "Webpack || Hooking Up ejs"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        }),
        new MinifyPlugin(),
        new CompressionPlugin({
            algorithm: "gzip"
        })
    ]
}