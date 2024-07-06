// Note this only includes basic configuration for development mode.
// For a more comprehensive configuration check:
// https://github.com/fable-compiler/webpack-config-template

var path = require("path");

module.exports = {
    mode: "development",
    entry: "./demos/Turtle/Turtle.fs.js",
    output: {
        path: path.join(__dirname, "./demos/Turtle"),
        filename: "bundle.js",
    },
    devServer: {
        publicPath: "/",
        contentBase: "./demos/Turtle",
        port: 8080,
    },
    plugins: [ ]
}
