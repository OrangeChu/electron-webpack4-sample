const path = require("path");
const merge = require("webpack-merge");

const base = require("./webpack.base.config");
const buildPath = path.resolve(__dirname, "./dist");

let externals = _externals();

const main = merge(base, {
  
  entry: "./src/main/main.js",
  output: {
    filename: "main.js",
    path: buildPath
  },
  externals: externals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: __dirname + "src",
        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader-ext"
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: "electron-main"
});

function _externals() {
  let manifest = require("./package.json");
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = "commonjs " + p;
  }
  return externals;
}

module.exports = main;