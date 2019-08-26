# nodejs

##  npm工具的使用

全称： node package manager

### package.json

建议每一个项目都要有一个 `package.json` 文件(包描述文件，就像产品的说明命数一样)

这个文件通过 `npm init -y` 的方式自动初始化出来

目前最有用的是 `dependencies` 选项，可以用来帮我们保存第三方包的依赖信息

+ 建议放在每个项目的跟目录下，建议执行 `npm install 包名` 的时候加上 `--save` 这个选项
  + 用来保存依赖项信息

+ 如果 `node_modules` 不小心删除了，可以通过： `npm install` 来把 `packsge.json` 中的
  + `dependencies` 中的所有依赖项都重新下载回来



###  可以通过命令行查询版本

  ```shell
  npm --version
  ```

### 升级 npm(自己升级自己):

  ```shell
  npm install --global npm
  ```
### 常用命令

+ npm init
  + npm init -y 可以跳过向导，快速生成
+ npm install 
  + 一次性把 dependencies 选项中的依赖全部安装
  + npm i
+ npm install 包名
  + 只下载
  + npm i 包名
+ npm install --save
  + 下载并且保存依赖项(package.json 文件中的 dependencies 选项)
  + npm i -S 包名
+ npm uninstall 包名

  + 只删除，如果有依赖项会依然保存
+ npm un 包名
+ npm uninstall --save 包名
  + 删除的同时也会把依赖信息也去除
  + npm un -S 包名

+ npm help
  + 查看使用帮助

+ npm 命令 --help
  + 查看指定命令的使用帮助

### 解决 npm 被墙问题

npm 存储包文件的服务器在国外，有时候会被墙，速度很慢

https://npm.taobao.org/  淘宝的开发团队把 npm 在国内做了一个备份

安装淘宝的 cnpm

```shell
# 在任意目录下执行都可以
# --global 表示安装的全局，而非当前目录
# --global 不能省略，否则不管用
npm install --global cnpm
```

接下来你安装包的时候把之前的 `npm` 替换成 `cnpm`

举个例子：

```shell
# npm 是通过国外的 npm 服务器，速度比较慢
npm install jquery

# 使用 cnpm 就会通过淘宝的服务器来下载 jquery
cnpm istall jquery
```

如果不想安装 `cnpm` 又想使用淘宝的服务器来下载

```shell
npm install jquery --registry=https://registry.npm.taobao.org
```

但是每一手动加参数很麻烦，所以我们可以把这个选项加入配置文件中

```shell
npm config set registry https://registry.npm.taobao.org

# 查看 npm 配置信息
npm config list
```

只要经过了上面命令的配置，则你以后所有的 `npm install` 都会默认通过淘宝的服务器来下载

## require 加载规则

### 三种情况
	 1.核心模块 
	 2.第三方模块 
	 3.自己写的模块

#### 如果是非路径形式的模块标识

  + 路径形式的模块： 1- ./(当前目录，不可省略), 2- ../(上一级目录，不可省略), 3- /xxx(几乎不用)
        绝对路径 d:/a/foo.js 几乎不用 
        首位的 / 在这里表示的是当前文件模块所属的磁盘跟路径
        .js 后缀名可以省略

#### 核心模块：本质是文件
  ​    核心模块文件已经被编译到二进制文件中，只需要按照名字来加载就可以了

#### 第三方模块

  + 凡是第三方模块都必须通过 npm 来下载
    - 使用的时候可以通过 require('包名') 的方式进行加载才可以使用
    - 不可能有任何一个第三方包和核心模块的名字是一样的
    - 既不是核心模块、也不是路径形式的模块
    	* 先找到当前文件所在目录中的 mode_modules 目录
    	* node_modules/art-template/package.json 文件中的 main 属性
    	* main 属性就记录了 art-template 的入口模块
    	* 然后加载使用这个第三方包， 最终加载的是文件

#### 如果都没有
如果 package.json 文件不存在或者 amin 制定的入口模块不存在
则 node 会自动找该目录下的 index.js ，也是就是说 index.js 会作为一个默认的被选项

如果以上所有任何一个条件都不成立，则会进入上一级的 node_modules 目录查找
上过上一级没有，则继续往上上一级查找。。。
如果直到当前磁盘根目录还找不到，最后报错 `can not find module xxx`

注意：我们一个项目有且只有一个 `node_modules` ,放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包
不会出现有多个 `node_modules`

#### 模块查找机制
优先从缓存加载
核心模块
路径形式的文件模块
第三方模块
  `node_modules/art-template/package.json`

### package.json 和  package-lock.json

npm 5 以前是不会有 `package-lock.json` 这个文件的

npm 5 以后才加入了这个文件

当安装包的时候，npm 都会生成或者更新 `package-lock.json` 这个文件

+ npm 5 以后的版本安装包不需要加 `--save` 参数，会自动保存依赖信息
+ 当安装包的时候，会自动创建或者是更新 `package-lock.json`这个文件
+ `package-lock.json` 这个文件会保存 `node_module` 中所有包的信息(版本、下载地址)
  + 这样的话重新 `npm install` 的时候速度就可以提升
+ 从文件来看，有一个 `lock` 称之为锁
  + 这个 `lock` 是用来锁定版本的
  + 如果项目依赖 `1.1.1` 版本
  + 如果重新 install 其实会下载最新版本，而不是 1.1.1
  + 目的是希望可以锁住 1.1.1 这个版本
  + 所以这个 `package-lock.json` 这个文件的另一个作用就是锁定版本号，防止自动升级到新版

## Express

原生的 `http` 在某些方面表现不足以应对开发需求，所以就需要使用框架来加快开发效率，框架的目的就是提高效率，让代码更高度统一。

在 Node 中，有很多 Web 开发框架，学习 `express` 为主。

### 起步

#### 安装

```shell
npm install --save express
```

hello world

```javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('hello world'))

app.listen(3000, () => console.log('app.js running...'))
```

#### 基本路由

路由器

+ 请求方法
+ 请求路径
+ 请求处理函数

路由其实就是一张表

这个表里有具体的映射关系

get:

```javascript
// 当你以 GET 方式请求 / 的时候，执行对应的处理函数
app.get('/', (req, res) => res.send('hello world'))
```

post:

```javascript
// 当你以 POST 方式请求 / 的时候，执行对应的处理函数
app.post('/', (req, res) => res.send('hello world'))
```

#### 静态服务

```javascript
//访问方式 /public资源(具体资源)
app.use(sxpress.static('public'))

//访问方式 /files资源(具体资源)
app.use(express.static('files'))

//访问方式 /public/xxx
app.use('/public', express.static('public'))

//访问方式 /static/xxx
app.use('/static', express.static('public'))

app.use('/static', express.static(path.join(__dirname, 'public')))
```

### 在 Express 中配置使用 `art-template` 模板引擎

[`art-template`官方文档](https://aui.github.io/art-template/zh-cn/docs/installation.html)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```javascript
app.engine('art', require('express-art-template'))
```

使用：

```javascript
// express 默认回去项目中的 views 目录找 index.html
app.get('/', (req, res) => res.render('index.html', {title: 'hello world'}))
```

如果想要修改默认的 `views`视图渲染目录，可以

```javascript
// 注意：第一个参数 views 指的是要改 views 属性
app.set('views', 目录路径)
```

### 在 Express 中获取表单 GET 请求参数

Express 内置了一个 API，可以通过 `req.query`来获取

```javascript
req.query
```



###  在 Express 获取表单 POST 请求体数据

在 Express 中没有内置获取表单 POST 请求的 API，需要使用一个第三方包： `body-parser`

安装：

```shell
npm install --save body-parser
```

配置：

```javascript
var express = require('express')
// 0.引包
var bodyParser = require('body-parser')

var app = express()

//配置 body-parser，只要加入配置，则在 req 请求对象上会多出来一个属性: body
//就可以直接通过 req.body 来获取表单 POST 请求数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

使用：

```javascript
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // 可以通过 req.body 来获取表单 POST 请求数据
  res.end(JSON.stringify(req.body, null, 2))
})
```

### 重定向

```javascript
// 网页跳转到指定 URL
res.redirect('/xxx)
```

### CRUD 案例

#### 模块化思想

模块如何划分

+ 模块职责要单一
+ Vue
+ angular
+ React
+ 有利于学习前端三大框架

#### 起步

+ 初始化
+ 安装依赖
+ 模板处理

#### 路由设计

| 请求方法 | 请求路径         | get参数 | post参数                       | 备注             |
| -------- | ---------------- | ------- | ------------------------------ | ---------------- |
| GET      | /students        |         |                                | 渲染首页         |
| GET      | /students/new    |         |                                | 渲染添加学生页面 |
| POST     | /students/new    |         | naem、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id      |                                | 渲染编辑页面     |
| POST     | /students/edit   |         | id、naem、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id      |                                | 处理删除请求     |

#### 提取路由模板

```javascript
/*
  router.js 路由模块
  职责：
    处理路由
      根据不同的请求方法 + 请求路径设置具体的请求处理函数
  模块职责要单一， 不要乱写
  划分模块的目的就是为了增强项目代码的可维护性
  提升开发效率
*/

var fs = require('fs')

// Express 提供了更方便的方式，专门用来包装路由
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
//渲染首页
router.get('/students', (req, res) => {})

//渲染添加学生页面
router.get('/students/new', (req, res) => {
  res.render('new.html')
})

//处理添加学生请求
router.post('/students/new', (req, res) => {})

//渲染编辑页面
router.get('/students/edit', (req, res) => {
  res.send('new new new')
})

//处理编辑请求
router.post('/students/edit', (req, res) => {
  res.send('new new new')
})

//处理删除请求
router.get('/students/delete', (req, res) => {
  res.send('new new new')
})

// 3. 把 router 导出
module.exports = router
```

app.js

```javascript
var router = require('./router')

//  挂载路由
app.use(router)
```

#### 设计操作数据的 API 文件模块

```javascript
/*
  students.js
  数据操作文件模块
  职责：操作文件中的数据，只处理数据，不关心业务
*/

/*
  获取所有学生列表
  return []
*/
exports.find = function () {}

/*
  添加保存学生
*/
exports.save = function () {}

/*
  更新学生
*/
exports.updata = function () {}

/*
  删除学生
*/
exports.delete = function () {}
```

#### 自己编写的步骤

+ 处理模板
+ 配置开放静态资源
+ 配置 `art-template` 模板引擎
+ 简单路由： /students 渲染静态页出来
+ 路由设计
+ 提取路由模块
+ 接下来的业务操作都需要处理文件数据，需要封装 student.js
+ 先学号 student.js 文件结构
  + 查询所有学生的 API find
  + findById
  + save
  + updateById
  + deleteById
+ 实现具体功能
  + 通过路由收到请求
  + 接受请求中的数据(get、post)
    + req.query
    + req.body
  + 调用数据操作 API 处理数据
  + 根据操作结果给客户端发送响应
+ 业务功能顺序
  + 列表
  + 添加
  + 编辑
  + 删除

## MongoDB

### 关系型数据库和非关系型数据库

表就是关系

或者说表与表之间存在关系

+ 所有的关系型数据库都需要通过 `sql` 语言来操作
+ 所有的关系型数据库在操作之前都需要设计表结构
+ 而且数据表还支持约束
  + 唯一的
  + 主键
  + 默认值
  + 非空
+ 非关系型数据库非常的灵活
+ 有的非关系型数据库就是 `key-value` 键值对
+ 但是 MongoDB 是长的最像关系型数据库的非关系型数据库
  + 数据库 => 数据库
  + 数据表 => 集合(数组)
  + 表记录 => (文档对象)
+ MongoDB 不需要设计表结构
+ 就是说可以任意的往里面存数据，没有结构性一说

### 安装

+ [64 位下载地址](https://www.mongodb.org/dl/win32/)
+ [32 位下载地址](https://www.mongodb.org/dl/win32/i386)

​	

+ 下载
+ 安装
+ 配置环境变量
+ 最后输入 `mongod --version` 测试是否安装成功

![1566833522239](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1566833522239.png)

## 异步编程

### 回调函数

不成立的情况：

```javascript
function add(x, y) {
  console.log(1)
  setTimeout(function () {
    console.log(2)
    var ret = x + y
    return ret
  }, 1000)
  console.log(3)
  //到这里执行就结束了， 不会等到前面的定时器，所以就返回了默认值 undefined
}

console.log(add(10, 20)) // => undefined
```

回调函数：

```javascript
function add(x, y, callback) {
  // callback 就是回调函数
  // var x = 10
  // var y = 20
  // var callback = function (ret) { console.log(ret) }
  console.log(1)
  setTimeout(function () {
    console.log(2)
    var ret = x + y
    callback(ret)
  }, 1000)
}

add(10, 20, function (ret) {
    // 我现在拿到这个结果可以做任何操作
    console.log(ret)
})
```

基于原生 XMLHTTPRequest 封装 get 方法：

```javascript
function get(url, callback) {
  var oReq = new XMLHttpRequest()
  // 当请求加载成功之后要调用指定的函数
  oReq.addEventListener("load", function () {
    // 需要得到这里的 oReq.responseText
    // console.log(oReq.responseText)
    callback(oReq.responseText)
  });
  oReq.open("GET", url, true)
  oReq.send()
}

get('/xxx', function (data) {
  console.log(data)
})
```



注意：

凡是需要获取一个函数中异步操作的结果，则必须通过回调函数获取

`srtTimeout`    `readFile`     `writeFile`     `ajax` 

## 修改完代码服务器自动重启

我们这可以使用一个第三方命令行工具： `nodemon` 来帮我们解决频繁修改代码重启服务器问题

`nodemon`是一个 Node.js 开发的第三方命令行工具，使用的时候需要独立安装：

```shell
# 在任意目录执行命令都可以， 所有需要 --global 来安装的包在任意目录执行
npm install --global nodemon
```

安装完毕之后，使用：

```shell
ndoe app.js

# 使用 nodemon
nodemon app.js
```

只要是通过 `nodemon app.js` 启动的服务，会监视文件变化，当文件发生变化的时候，自动重启服务器