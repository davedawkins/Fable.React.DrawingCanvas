// Note this only includes basic configuration for development mode.
// For a more comprehensive configuration check:
// https://github.com/fable-compiler/webpack-config-template

var path = require("path");

module.exports = {
    mode: "development",
    entry: "./demos/Fractal/Fractal.fs.js",
    output: {
        path: path.join(__dirname, "./demos/Fractal"),
        filename: "bundle.js",
    },
    devServer: {
        publicPath: "/",
        contentBase: "./demos/Fractal",
        port: 8080,
    },
    plugins: [ ]
}
