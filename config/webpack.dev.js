const path = require("path")
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        mainFields: ['loader', 'main']
    },
    entry: {
        // main: ["core-js/fn/promise", "./src/main.js"]
        main: ["babel-runtime/regenerator", "webpack-hot-middleware/client?reload=true", "./src/main.js"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),

    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true,
        stats: {
            colors: true
        }
    },
    devtool: "source-map",
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
                        loader: "style-loader"
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HTMLWebpackPlugin({
            template: "./src/index.hbs",
            title: "Webpack || Hooking Up ejs"
        })
    ]
}