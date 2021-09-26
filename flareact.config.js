const path = require('path')
const postCssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            config: path.resolve(__dirname),
        },
    },
}

const sassLoader = {
    loader: "sass-loader",
    options: {
        implementation: require("sass"),
        sassOptions: {
            fiber: require("fibers"),
        },
    },
};
const cssLoader = {
    loader: "css-loader",
    options: {
        importLoaders: 1,
        esModule: false,
    },
}
const styleLoader = {
    loader: 'isomorphic-style-loader',
}


module.exports = {
    webpack: (config, {dev, isWorker, defaultLoaders, webpack}) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        if (isWorker) {
            const test = "test.module.scss"
            const rule = config.module.rules.filter(r => r.test.test(test))[0]
            rule.use = rule.use = [
                styleLoader,
                cssLoader,
                postCssLoader,
                sassLoader
            ]

            // console.log("server", config.module.rules.filter(r => r.test.test(test))[0])
        } else {
            const test = "test.module.scss"
            const rule = config.module.rules.filter(r => r.test.test(test))[0]
            // console.log("client", config.module.rules.filter(r => r.test.test(test))[0])
            // config.optimization.minimizer = []
        }
        config.module.rules.push({
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                }
            ]
        })
        config.module.rules.push({
            test: /\.(ttf|eot|woff|woff2)$/i,
            use: [
                {
                    loader: 'url-loader',
                }
            ]
        })
        // config.module.rules.push({
        //     test: /\.svg$/,
        //     use: [
        //         {
        //             loader: "babel-loader"
        //         },
        //         {
        //             loader: "react-svg-loader",
        //             options: {
        //                 jsx: true // true outputs JSX tags
        //             }
        //         }
        //     ]
        // })
        return config;
    },
};
