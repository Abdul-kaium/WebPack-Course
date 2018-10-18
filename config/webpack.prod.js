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
        main: ["./src/main.js"]
    },
    mode: "production",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),

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

                    }
                ]
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

                use: [{
                    loader: "file-loader",
                    options: {
                        name: "images/[name]-[hash:8].[ext]"
                    }
                }]
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
            template: "./src/index.hbs",
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
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        })
    ]
}