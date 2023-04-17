const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "{{FILENAME}}",
        globalObject: "this",
        clean: true,
        library: {
            name: "{{LIBNAME}}",
            type: "umd"
        }
    },
    externals: {
        jQuery: {
            commonjs: "jQuery",
            commonjs2: "jQuery",
            amd: "jQuery",
            root: "$"
        }
    }
};
