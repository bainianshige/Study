const path = require('path')

const webpack = require('webpack')

const devServer = require('webpack-dev-server')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 导入在内存中生成 html 页面的插件 
// 只要是插件，都一定要 放到 plugins节点中去
// 这个插件的两个作用： 1.自动在内存中根据指定页面生成一个内存的页面  2.自动把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

// 这个配置文件，是一个 js 文件，通过 Node 中的模块操作，向外暴露了一个配置对象
module.exports = {
  // 初始配置
  entry: path.join(__dirname, 'src/main.js'),  // 入口文件,表示要使用 webpack 打包的文件

  output: {   // 输出文件相关的配置
    filename: ('bundle.js'),  // 指定输出文件的文件名
    path: path.join(__dirname, './dist')  // 输出文件路径
  },

  mode: 'development',  // 开发环境 二选一
  // mode: 'production'   // 生产环境 二选一

  // 自动编译打包运行 配置

  devtool: 'inline-source-map',

  devServer: { // 配置 dev-server 命令参数，相对麻烦一些
    open: true, // 自动打开浏览器
    port: 3000, // 设置启动时的运行端口
    contentBase: 'src', // 指定托管的跟目录
    hot: true // 启用热更新
  },

  plugins: [ // 配置插件的节点
    new htmlWebpackPlugin({  // 创建一个在内存中生成 html 页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html' // 指定生成的页面的名称
    }),
    new VueLoaderPlugin()
  ],

  module: { // 这个节点，用于配置 所有的第三方模块加载器
    rules: [ // 所有第三方模块的 匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理，css 文件的第三方 loader 规则
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 配置处理，less 文件的第三方 loader 规则
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },  // 配置处理，scss 文件的第三方 loader 规则
      // limit 给定的值是图片的大小单位是 byte 如果引用的图片，大于或等于给定的 limit 值，则不会被转为 base64 格式字符串
      // 如果引用的图片，小于给定的 limit 值，则会被转为 base64 格式字符串
      { test: /\.(png|jpg|gif)$/i, use: 'url-loader?limit=4396&name=[hash:8]-[name].[ext]' }, // 配置处理，图片路径的第三方 loader 规则
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 配置处理 字体文件
      { test: /\.m?js$/, exclude: /(node_modules|bower_components)/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // 语法
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']  // 插件
          }
        }
      }, // 处理ES6 语法
      { test: /\.vue$/, use: 'vue-loader' } // 处理 vue 编译

      // use 拿到数据后是从后往前执行，执行结束后把处理过的数据传给前面的 loader 执行
      // use 中的 plugins 拿到数据后是从前往后执行，执行结束后把处理过的数据传给前面的插件执行
    ]
  }
}

/*
当我们在 控制台，直接输入 webpack 命令执行的时候，webpack 执行了哪几步：
  1. webpack 发现，没有通过命令的形式，给它指定入口和出口
  2. webpack 就会去项目的跟目录中， 查找一个叫做 'webpack.config.js'的配置文件
  3. 当找到配置文件后， webpack 会解析执行配置文件，当解析完配置文件后，就得到 配置文件中 导出的配置对象
  4. 当 webpack 拿到配置对象后，就拿到了配置对象中指定的 入口 和 出口，然后进行到打包构建
*/
