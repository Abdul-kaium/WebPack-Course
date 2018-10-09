import express from "express";
import path from "path";
const server = express();

const webpack = require("webpack");
// const config = require("../../config/webpack.dev.js");
const config = require("../../webpack.config.dev.js");
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devserver
)

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);


server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
const staticMiddleware = express.static("dist");
server.use(staticMiddleware);
// const expressStaticGzip = require("express-static-gzip");
// server.use(expressStaticGzip("dist"));

server.listen(8080, () => {
    console.log("server is listening from localhost:8080");
});