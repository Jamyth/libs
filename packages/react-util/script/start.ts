import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

const PORT = 8080;

const directory = {
  config: path.join(__dirname, "../config"),
  src: path.join(__dirname, "../src"),
  test: path.join(__dirname, "../ui-test"),
};

const file = {
  tsconfigTestJSON: path.join(directory.config, "tsconfig.test.json"),
  indexHTML: path.join(directory.test, "index.html"),
};

const config: webpack.Configuration = {
  mode: "development",
  entry: path.join(__dirname, "../ui-test/index.tsx"),
  output: {
    filename: "static/js/[name].js",
    publicPath: "/",
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.join(__dirname, "../.webpack-cache"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
    modules: ["node_modules"],
    alias: {
      "@jamyth-frontend-libs/react-util": directory.src,
      test: directory.test,
    },
  },
  devtool: "source-map",
  optimization: { usedExports: true },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: { configFile: file.tsconfigTestJSON, transpileOnly: true },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf|ico|mp3|mp4|wav|mov)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash:8].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: file.indexHTML }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin({}),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/local$/,
      contextRegExp: /moment$/,
    }),
  ],
};

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  https: true,
  historyApiFallback: true,
  hot: true,
  compress: true,
  overlay: { warnings: true, errors: true },
  stats: { colors: true },
});
server.listen(PORT, "0.0.0.0");

const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => {
    server.close();
    process.exit();
  });
});
