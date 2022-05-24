const path = require('path')

module.exports = {
    entry: {
        homePage: './src/client/client.ts',
        mainPage: './src/client/main.ts'},
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist/client'),
        chunkFilename: '[id].[chunkhash].js'
    },
}