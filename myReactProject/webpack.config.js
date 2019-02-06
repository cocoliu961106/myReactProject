var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname + '/src',
    entry: "./js/index.js",
    devServer:{inline:true},
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        },
            //ant design
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    output: {
        path: __dirname + "/src/",
        filename: "bundle.js"
    }
};