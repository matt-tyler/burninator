const AwsSamPlugin = require("aws-sam-webpack-plugin");
const awsSamPlugin = new AwsSamPlugin();
const path = require("path");

module.exports = Object.entries(awsSamPlugin.entry()).map(([name, entry]) => {
  return {
    entry,
    output: {
      filename: "app.js",
      libraryTarget: "commonjs2",
      chunkFilename: "[id].js",
      path: path.join(__dirname, `/.aws-sam/build/${name}`)
    },
    devtool: false,
    resolve: {
      extensions: [".ts", ".js"]
    },
    target: "node",
    externals: [
      "aws-sdk", 
      /aws-sdk\/clients\/.*/
    ],
    mode: process.env.NODE_ENV || "production",
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "babel-loader"
        }
      ]
    },
    plugins: [
      awsSamPlugin
    ]
  }
})
