const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    mode: 'none',
    devtool: 'source-map',
    entry: {
        'gy-ui': './src/index.js',
        'gy-ui.min': './src/index.js',
    },
    output: {
        filename: '[name].js',
        libraryExport: 'default',
        library: 'gy-ui',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'url-loader'
                ]
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                include: /\.min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                        drop_console: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
        }),
        new webpack.BannerPlugin(
            'treejs\n@version 1.8.0\n@see https://github.com/DBCdouble/gy-ui'
        ),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
};
