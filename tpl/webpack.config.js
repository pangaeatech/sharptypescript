const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "{{FILENAME}}",
    globalObject: "this",
    clean: true,
    library: {
      name: "{{LIBNAME}}",
      type: "umd",
    },
  },
  externals: {
    jQuery: {
      commonjs: "jQuery",
      commonjs2: "jQuery",
      amd: "jQuery",
      root: "$",
    },
  }
};
