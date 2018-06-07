const path = require('path');
const webpack = require('webpack');
// `..` since this config file is in the config folder.
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
    mode: 'development',
    entry: {
        // since we need to load view in the entry page.
        vue: 'vue',
        // this is where the `main-content` component is
        index: resolve('src/index.js'),
    },
    output: {
        filename: '[name].js',
        // folder where the output of webpack's result go.
        path: resolve('dist'),
    },
    module: {
        rules: [
            {
                // vue-loader config to load `.vue` files or single file components.
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
                        css: ['vue-style-loader', {
                            loader: 'css-loader',
                        }],
                        js: [
                            'babel-loader',
                        ],
                    },
                    cacheBusting: true,
                },
            },
            {
                // this is required for other javascript you are gonna wri
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('node_modules/webpack-dev-server/client'),
                ],
            },
        ],
    },
    // There are multiple devtools available, check here https://github.com/webpack/webpack/tree/master/examples/source-map
    devtool: 'eval',
    devServer: {
        // the url you want the webpack-dev-server to use for serving files.
        host: '0.0.0.0',
        // can be the popular 8080 also.
        port: 8010,
        // gzip compression
        compress: true,
        // open the browser window, set to false if you are in a headless browser environment.
        open: false,
        watchOptions: {
            ignored: /node_modules/,
            poll: true,
        },
        // The path you want webpack-dev-server to use for serving files
        publicPath: '/dist/',
        // for static assets
        contentBase: resolve('src/assets'),
        // reload even if something changes for static assets
        watchContentBase: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        // the compiler-included build of vue which allows to use vue templates without pre-compiling them
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.vue', '.js', '.json'],
    },
    // webpack outputs performance related stuff in the browser.
    performance: {
        hints: false,
    },
};