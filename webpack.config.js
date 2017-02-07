const path = require('path');
const webpack = require('webpack');

var production = false;
var dev_server = false;
var config = {};

if (process.env.NODE_ENV === 'production') {
    console.log("PRODUCTION BUILD");
    production = true;
} else if (process.env.NODE_ENV === 'dev_server') {
    console.log("DEVELOPMENT SERVER");
    dev_server = true;
} else {
    console.log("DEVELOPMENT BUILD");
}

config = {
    entry: dev_server ? './src/devServer.js' : './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'ngui.min.js',
        // libraryTarget: "umd",
        // library: "ngui",
        // umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/]
            }, {
                test: /\.html$/,
                use: 'raw-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: production ? false : true
                        }
                    }
                ]
            }
        ]
    },
};

if (production) {
    config.externals = {
        "angular": "angular"
    }
} else {
    // config.devtool = "cheap-eval-source-map";
    config.devtool = "inline-source-map";
}

module.exports = config;
