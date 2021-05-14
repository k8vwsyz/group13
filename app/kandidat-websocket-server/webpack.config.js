const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    target: 'node',
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'index.bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader' }
        ],
    }
};