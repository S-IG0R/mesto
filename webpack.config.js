const path = require('path'); // подкл. утилиту абсолютного пути
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подкл. плагин обработки html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //плагин очистки папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //плагин для объединения css

module.exports = {
  entry: {main: './src/pages/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
      publicPath: ''
  },
  mode: 'development',
    devServer: {
      static:  path.resolve(__dirname, './dist'),
      compress: true,
      port: 8080,
      open: true
    },
    module: {
      rules: [
        {
          //обрабатываем все js кроме папки node_modules
          test: /\.js$/,
          use: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource'
        },
        {
          // применять это правило только к CSS-файлам
          test: /\.css$/,
          // при обработке этих файлов нужно использовать
          // MiniCssExtractPlugin.loader и css-loader
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          }, 'postcss-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html' // путь к файлу index.html
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin()
    ]
}
