# webpack

## 什么是 `webpack?`

webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具

## 网页中常见的静态资源

- JS

- .js  .jsx  .coffee  .ts（TypeScript  类 C# 语言）

- CSS

- .css  .less   .sass  .scss

- Images

- .jpg   .png   .gif   .bmp   .svg

- 字体文件（Fonts）

- .svg   .ttf   .eot   .woff   .woff2

- 模板文件

- .ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】

## `nrm`的安装使用

作用： 提供了一些常用的 NPM 包镜像地址

+ 运行 `npm install nrm -g` 全局安装 `nrm` 包
+ 使用 `nrm ls` 查看当前所有的可用的镜像源地址以及当前所使用的镜像源地址
+ 使用 `nrm use npm` 或 `nrm use taobao`  切换不同的镜像源地址

> 注意： `nrm` 只收单纯的提供了几个常用的 下载包的 URL地址，并能够让在几个地址中很方便的进行切换
>
> ​			但是在装包的时候用的还是 `npm`

## webpack安装的两种方式

+ 运行`npm i webpack webpack-cli -g`全局安装webpack和webpack-cli，这样就能在全局使用webpack的命令
+ 在项目根目录中运行`npm i webpack --save-dev`安装到项目依赖中

## 运行指令配置 

> [中文文档](https://webpack.docschina.org/)

- 开发配置指令：webpack src/js/app.js -o dist/js/app.js --mode=development 
  - 功能: webpack能够编译打包js和json文件，并且能将es6的模块化语法转换成浏览器能识别的语法
- 生产配置指令：webpack src/js/app.js -o dist/js/app.js --mode=production 
  - 功能: 在开发配置功能上加上一个压缩代码

- 缺点：
  - 不能编译打包css、img等文件
  - 不能将js的es6基本语法转化为es5以下语法
- 改善：使用webpack配置文件解决，自定义功能

### 基本配置

在项目根目录下创建 `webpack.config.js` 文件用来配置 `webpack` 工具

```javascript
// 引入文件模块 path -- webpack 是基于 Nodejs 开发的
const path = require('path')

// 这个配置文件，是一个 js 文件，通过 Node 中的模块操作，向外暴露了一个配置对象
module.exports = {
  entry: path.join(__dirname, './src/main.js'),  // 入口文件,表示要使用 webpack 打包的文件
  output: {   // 输出文件相关的配置
    filename: ('bundle.js'),  // 指定输出文件的文件名
    path: path.join(__dirname, './dist')  // 输出文件路径
  },
  mode: 'development'  // 开发环境 二选一
  // mode: 'production'   // 生产环境 二选一
}
// 配置完成后就可以直接使用 webpack 来完成文件的打包
```

当我们在 控制台，直接输入 webpack 命令执行的时候，webpack 执行了 4 步：
  1. webpack 发现，没有通过命令的形式，给它指定入口和出口
  2. webpack 就会去项目的跟目录中， 查找一个叫做 'webpack.config.js'的配置文件
  3. 当找到配置文件后， webpack 会解析执行配置文件，当解析完配置文件后，就得到 配置文件中 导出的配置对象
  4. 当 webpack 拿到配置对象后，就拿到了配置对象中指定的 入口 和 出口，然后进行到打包构建

> [详细配置点我](https://juejin.im/post/5c8b72bbf265da2dcd7a29c4)

### 自动编译打包运行配置

+ 安装 `loader`

```shell
# 把工具安装到项目的本地开发依赖
npm install webpack-dev-server --save-dev
```

`webpack-dev-server` 依赖于 `webpack` 和 `webpack-cli`

+ 安装

```shell
# 安装到开发环境中
npm install webpack webpack-cli -D
```

+ 配置

+ 第一种方式：在`package.json` 中 `script` 中添加

```json
"scripts": {
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
}
// --open 自动打开浏览器
// --port 3000 设置启动时的运行端口为 3000
// --contentBase src  设置自动打开网页直接显示 src 中的页面
// --hot  网页局部更新(热更新)
```

+ 第二种方式在 `webpack.config.js` (webpack配置文件) 中添加

```javascript
// 先在 package.json 中的 script 中添加
"script": {
    "dev": "webpack-dev-server"
}

// 自动编译打包运行 配置
devServer: { // 配置 dev-server 命令参数，相对麻烦一些
  open: true, // 自动打开浏览器
  port: 3000, // 设置启动时的运行端口
  contentBase: 'src', // 指定托管的跟目录
  hot: true // 启用热更新
}
```

> **到这一步自己实验已经可以达到效果，但是查的资料还有以下的步骤**

+ 引入 `webpack` 模块

```javascript
const webpack = require('webpack')
```

+ 继续在配置文件后面添加

```javascript
plugins: [ // 配置插件的节点
    new webpack.HotModuleReplacementPlugin(),// new一个热更新的模块对象，这里是启动热更新的第三部
    new webpack.NameModulePlugin()
]
```

运行指令

```shell
npm run dev
```

+ 注意：指令运行的是: `__dirname 下面的 node_modules\webpack-dev-server\bin\webpack-dev-server`
  + 也可以指定文件路径启动服务

### 打包静态页面配置

由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以推荐大家使用`html-webpack-plugin`插件配置启动页面

+ 安装

```shell
cnpm i html-webpack-plugin --save-dev
```

+ 修改`webpack.config.js`配置

```javascript
// 导入在内存中生成 html 页面的插件 
// 只要是插件，都一定要 放到 plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')

plugins: [ // 配置插件的节点
    new htmlWebpackPlugin({  // 创建一个在内存中生成 html 页面的插件
        template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
        filename: 'index.html' // 指定生成的页面的名称
    })
]
```

+ 修改`package.json`中`script`节点中的dev指令

```javascript
"dev": "webpack-dev-server"
```

+ 将index.html中script标签注释掉，因为`html-webpack-plugin`插件会自动把bundle.js注入到index.html页面中

+ 运行指令

```shell
webpack
```

### 打包 css、 less、sass 文件资源

+ 安装

```shell
cnpm install style-loader css-loader less-loader less sass-loader node-sass --save-dev
```

+ 修改 `webpack.config.js`配置文件

```javascript
module: { // 这个节点，用于配置 所有的第三方模块加载器
  rules: [ // 所有第三方模块的 匹配规则 
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理，css 文件的第三方 loader 规则
    { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] } // 配置处理，less 文件的第三方 loader 规则
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] } // 配置处理，sass 文件的第三方 loader 规则
  ]
}
```

+  **注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；**

### 处理 css 中的 url 地址的配置

+ 安装
  + 依赖 `file-loader` 模块

```shell
cnpm install url-loader file-loader --save-dev
```

#### 通过 url 处理图片配置

+ 修改 `webpack.config.js` 配置文件
  + 添加处理url路径的 loader 模块
  + 通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码
    + `limit` 给定的值是图片的大小单位是`byte`
    + 如果引用的图片，大于或等于给定的 limit 值，则不会被转为 base64 格式字符串 
    + 如果引用的图片，小于给定的 limit 值，则会被转为 base64 格式字符串
  + 通过`name`指定处理之后图片的名字为原来的名字
    + &name[name].[ext] 这样会有名字重复的问题
    + 在名字前面增加 `hsah` 值来避免重复  &name=[hash:8]-[name].[ext]

```javascript
// 第一种方式:options传递参数
{ test: /\.(png|jpg|gif)$/, use: [{ loader: 'url-loader', options: { limit: 81920 }}] }
// 第二种方式:通过 ? 传递参数
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=4396&name=[hash:8]-[name].[ext]‘ }
```

#### 通过 url 处理字体配置

```javascript
{ test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' } // 配置处理 字体文件
```

### 处理`ES6`语法编译配置

+ 安装

+ 通过 Babel，可以将高级的语法转换为低级的语法
+ 7.0版本之前：在 webpack 中，可以运行如下两套命令，安装两套包，去安装 Babel 相关的 loader 功能
  + 第一套包： `cnpm i babel-core babel-loader babel-plugin-transform-runtime -D`
  +  第二套包：` cnpm i babel-preset-env babel-preset-stage-0 -D`
+ 8.0 版本自己配成功的
  + 第一套包：`cnpm i @babel/core babel-loader @babel/plugin-transform-runtime @babel/runtime -D`
  + 第二套包：` cnpm i @babel/preset-env @babel/plugin-proposal-class-properties -D`

+ 配置

  + 打开 webpack 的配置文件，在 module 节点下的 rules 数组中，添加一个新的匹配规则
  + 在项目的根目录中，新建一个叫做 .babelrc 的 Babel 配置文件，属于 JSON 格式，所以在写 .babelrc 配置的时候，必须符合 JSON 语法规范，不能写注释，字符串必须用双引号等等

  ```javascript
  // 7.0 版本之前的配置
  // 在配置 babel 的 loader 规则的时候，必须把 node_modules 目录，通过 exclude 选项排除掉
  { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
  
  // 在 .babelrc 中写如下配置    presets 可以理解为【语法】的意思
  { 
    "presets": ["env", "stage-0"],
    "plugins": ["transform-runtime"]
  }
  ```

  ```javascript
  // 7.0 版本之后的配置
  // 在配置 babel 的 loader 规则的时候，必须把 node_modules 目录，通过 exclude 选项排除掉
  { test: /\.m?js$/, exclude: /(node_modules|bower_components)/, 
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'] 
      }
    }
}
  ```
  
  

## 其他

### `package.json`中的生产环境(devDependencies)和开发环境(dependencies)

+ devDependencies  里面的插件只用于开发环境，不用于生产环境，而 dependencies  是需要发布到生产环境的

+ 比如写一个项目要依赖于jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入dependencies 

+ 而使用的一些构建工具比如glup、webpack这些只是在开发中使用的包，上线以后就和他们没关系了，所以将它写入devDependencies。

+ 开发环境安装示例

  ```shell
  npm install xxx --save-dev
  # 可以简写为
  npm install xxx -D
  ```

+ 生产环境安装示例

  ```shell
  npm install xxx --save
  # 可以简写为
  npm install xxx -S
  ```

  

### 删除 node_modules

+ 安装

```shell
npm install rimraf -g
```

+ 执行删除

```shell
rimraf node_modules
```