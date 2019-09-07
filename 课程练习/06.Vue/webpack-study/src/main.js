// 这个项目的 js 入口文件


// 1.导入 Jquery
// import *** from *** 是es6中导入模块的方式
// 浏览器解析不了 ES6 的代码，所以这一行的执行会报错
import $ from 'jquery'
// const $ = require('jquery')


// 使用 import 语法，导入css样式表
import './css/index.css'
import './css/index.less'
import './css/index.scss'
// 如果要通过路径的形式引入 node_modules 中相关的文件，可以省略路径前面的 node_modules 这一层目录，直接写包的名称然后再跟上具体的文件路径
// 不写 node_modules 这一层目录，默认就会去 node_modules 中查找
import 'bootstrap/dist/css/bootstrap.css'
// 注意： webpack, 默认只能打包 js 类型的文件，无法处理其他非 js 类型的文件
// 如果要处理 非 js 类型的文件。需要手动安装一些合适的 loader 加载器
// 1. 如果想要打包处理 css 文件，需要安装 npm i style-loader css-loader less-loader less -D
// 2. 打开 webpack.config.js 这个配置文件，在 里面，新增一个配置节点，叫做 module,是一个对象,在这个 module 对象上，有 rules 属性是个数组，这个数组中存放了所有第三方文件的 匹配和 处理规则；

// 注意： webpack 处理第三方文件类型的过程
  // 1. 发现需要处理对文件不是 js 文件，然后就去配置文件中，查找有没有对应的第三方 loader 规则
  // 2. 如果能找到对应的规则，就会调用对应的 loader 处理这种文件类型
  // 3. 在调用 loader 的时候，是从后往前调用
  // 4. 当最后一个 loader 调用完毕，会把处理的结果，直接交给 webpack 进行打包合并，最终输出到 bundle.js 中去




$(function () {
  $('li:odd').css('backgroundColor', 'skyblue')
  $('li:even').css('backgroundColor', function () {
    return '#' + 'd97634'
  })
})
/*
webpack 可以做的事
  1. webpack 能够处理 js 文件的互相依赖关系
  2. webpack 能够处理 js 的兼容问题，把 高级的、浏览器不识别的语法，转为浏览器能识别的语法
  
  运行命令的格式： webpack 要打包的文件路径 -o 打包好的文件的输出路径 --mode=development
*/

/*
使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
  1. 运行 npm i webpack-dev-server --server-dev 把工具安装到项目的本地开发依赖
  2. 安装完毕后，这个工具的用法， 和 webpack 命令的用法，完全一样
  3. 由于是本地安装的 webpack-dev-server ，所以无法把它当作 脚本命令，在命令行(Powershell)直接运行(只有安装到全局 -g 的工具，才能在 终端中正常执行)
  4. 注意：webpack-dev-server 工具，如果想要正常运行，要求在本地项目中，必须安装 webpack 
  5. webpack-dev-server 帮打包生成的 bundle.js 文件，并没有存放到实际的物理磁盘上；而是直接托管到了电脑内存中，所以在项目根目录中，根本找不到 这个打包好的 bundle.js
  6. 可以认为 webpack-dev-server 把打包好的文件，以一种虚拟的形式，托管到了项目的 根目录 中，虽然看不到，但是有一个 叫做 bundle.js 的文件
*/


// class 关键字，是 es6 中提供的新语法，是用来实现 es6 中面向对象编程的方式
class Person {
  // 使用 stati 关键字，可以定义静态属性
  // 所谓的静态属性，就是可以直接通过类名，直接进行访问的属性
  // 实例属性： 只能通过类的实例，来访问的属性，叫做实例属性
  static info = { name: 'zs', age: 20 }
}

// 访问 Person 类身上的 info 静态属性
console.log(Person.info)
// 在 webpack 中，默认只能处理一部分 es6 的新语法，一些更高级的 es6 语法或者 es7 语法 webpack 是处理不了的，这时候就需要借助第三方的 loader，来帮助 webpack 处理这些高级的语法，当 webpack 把高级语法转为低级的语法之后，会把结果交给 webpack 去打包到 bundle.js 中去
// 通过 Babel，可以将高级的语法转换为低级的语法
// 在 webpack 中，可以运行如下两套命令，安装两套包，去安装 Babel 相关的 loader 功能
  // 第一套包： cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
  // 第二套包： cnpm i babel-preset-env babel-preset-react -D
// 打开 webpack 的配置文件，在 module 节点下的 rules 数组中，添加一个新的匹配规则
  // { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
  // 注意：在配置 babel 的 loader 规则的时候，必须把 node_modules 目录，通过 exclude 选项排除掉
    // 原因一： 如果不排除 node_modules，则 Babel 会把 node_modules 中所有的第三方 js 文件都打包编译，打包速度非常慢
    // 原因二： 哪怕最终 Babel 把所有的 node_modules 中的 js 转换完毕了，项目也无法正常运行
// 在项目的根目录中，新建一个叫做 .babelrc 的 Babel 配置文件，属于 JSON 格式，所以在写 .babelrc 配置的时候，必须符合 JSON 语法规范，不能写注释，字符串必须用双引号等等
  // 在 .babelrc 中写如下配置    presets 可以理解为【语法】的意思
    // { 
    //   "presets": ["env", "stage-0"],
    //   "plugins": ["transform-runtime"]
    // }
// 注意： 上面写法是 babel 7.0版本之前的用法配置



// 和 java c# 实现面向对象的方式完全一样，class 是从后端语言中借鉴过来，实现面向对象
// var p1 = new Person()

// es6 之前的语法
function Animal(name) {
  this.name = name
}

Animal.info = 123

var a1 = new Animal('张参数')

// 静态属性
// console.log(Animal.info)
// 实例属性
console.log(a1.name)
