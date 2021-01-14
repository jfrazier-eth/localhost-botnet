// const malware = "./src/malware/software.js";
const main = "./src/index.js";

module.exports = {
    entry: main,
    output: {
        filename: "./dist/bundle.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
};