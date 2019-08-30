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

### 解决 npm 被墙问题（建议使用rnm-在vue笔记中有记载）

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

## path 路径操作模块

> 参考文档 ： https://nodejs.org/dist/latest-v10.x/docs/api/path.html

+ path.basename
  + 获取一个路径的文件名 (默认包含扩展名)
+ path.dirname
  + 获取一个路径中的目录部分
+ path.extname
  + 获取一个路径中的扩展名部分
+ path.parse
  + 把一个路径转为对象
  + root 根路径
  + dir 包含后缀名的文件名
  + base 后缀名
  + name  不包含后缀名的文件名
+ path.join
  + 当需要进行路径拼接的时候，推荐使用这个方法
+ path.isAbsolute 判断一个路径是否是绝对路径

### Node中的相对路径

文件操作中，相对路径是相对于执行 node 命令所处的路径

```javascript
// 相对于执行 node 命令所处的终端路径
./xxx.txt
```

在文件操作中，使用相对路径是不可靠的

为了解决这个问题，需要把相对路径变为绝对路径

可以使用 Node 中的非模块成成员 `__dirname` 、`filename` 来解决问题

在拼接路径的过程中，为了避免手动拼接错误，推荐使用： `path.join()` 来辅助拼接

在文件操作中使用相对路径都统一转化为**动态的绝对路径**

> 补充：模块中的路径标识和这里的路径没关系，不受影响（就是相对于文件模块）

### Node中的非模块成员

在每一个模块中，除了 `reruire` 、`exports` 等模块相关 API 之外，还有两个特殊的成员：

+ `__dirname` **动态获取**可以用来获取当前文件模块所属目录的绝对路径
+ `__filename ` **动态获取**可以用来获取当前文件的绝对路径
+ `__dirname`  和 `__filename `  是不受执行 node 命令所属路径影响的

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
app.use('/public/', express.static('./public/'))

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
// 第一个参数用来配置视图的后缀名，这里是 art ，那么存储在 views 目录中的模板文件必须是 xxx.art
// app.engine('art', require('express-art-template'))

// 可以把 art 改为 html
app.engine('html', require('express-art-template'))
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

### Express 中使用第三方包`express-session` 实现 `Session` 、`Cookie`

> 参考文档： https://github.com/expressjs/session

#### 安装

``` shell
npm install express-session
```

#### 配置

```javascript
// 引包
var session = require('express-session')

// 该插件为 req 请求对象添加一个成员： req.session 默认是一个对象
// 这是最简单的配置方式
app.use(session({
  // 配置加密字符串，会在原有的加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true  // true：无论是否使用 Session ，都会默认直接分配一把钥匙
}))
```

#### 使用

```javascript
// 添加 Session 数据
req.session.foo = 'bar'

// 获取 Session 数据
req.session.foo
```

#### 提示

默认 Session 数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把 Session 进行持久化存储

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

### Express 中间件

> https://expressjs.com/en/resources/middleware.html

中间件的本质就是一个请求处理方法，我们把用户从请求到响应的整个过程分发到多个中间件去处理，这样做的目的是提高代码的灵活性，动态可扩展性

+ 在同一个请求所经过的中间件都是同一个请求对象和响应对象

#### 应用程序级别中间件

万能匹配（不关心任何请求路径和请求方法）

```javascript
  // 任何请求都会进入这个中间件
  // 中间件本身是一个方法，方法接收三个参数
    // Request 请求对象
    // Response 响应对象
    // Next 下一个中间件
  // 当一个请求进入中间件之后，如果不调用 Next() 则会停留在当前中间件
  // 所以 next 是一个方法，用来调用下一个中间件的
  // 调用 next 也是要匹配的（不是调用紧挨着的那一个）

  app.use((req, res, next) => {
    console.log('1')
    next()
  })
```

关心请求路径的中间件

```javascript
// 关心请求路径的中间件 (以 /xxx 开头的路劲中间件)
app.use('/a', function (req, res, next) {
  console.log(req.url)
})
```

#### 路由级别中间件

严格匹配请求方法和请求路径的中间件

```javascript
app.get('/', (req, res, next) => {
  console.log('/')
})
```

#### 第三方中间件

+ [body-parser](https://expressjs.com/en/resources/middleware/body-parser.html)
+ [compression](https://expressjs.com/en/resources/middleware/compression.html)
+ [cookie-parser](https://expressjs.com/en/resources/middleware/cookie-parser.html)
+ [morgan](https://expressjs.com/en/resources/middleware/morgan.html)
+ [response-time](https://expressjs.com/en/resources/middleware/response-time.html)
+ [serve-static](https://expressjs.com/en/resources/middleware/serve-static.html)
+ [session](https://expressjs.com/en/resources/middleware/session.html)

## MongoDB

### MongoDB 数据库的基本概念

+ 可以有多个数据库
+ 一个数据库中可以有多个集合(表)
+ 一个集合中可以有多个文档文档(表记录)
+ 文档结构很灵活，没有任何限制
+ MongoDB 非常灵活， 不需要像 MySQL 一样先创建数据库、表、设计表结构
  + 在这里需要:当需要插入数据的时候，指定往哪个数据库的哪个集合操作就可以了
  + 一切由 MongoDB 来自动建库建表

```javascript
{
  qq:{
    users:[
      {},  
      {},  
      {}
      ...
    ],
    products:[
        
    ]
    ...
  },
  taobao:{
      
  },
  baidu:{
      
  }
}
```



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

### 启动和关闭数据库

启动：

```shell
# mongodb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录
# 在第一次执行命令之前先自己手动新建一个 /data/db
mongod
```

如果想要修改默认的数据存储目录，可以：

```shell
mongod --dbpath = 数据存储目录路径
```

停止：

```shell
在开始服务的控制台，直接 Ctrl+c 即可停止
或者直接关闭开启服务的控制台也可以
```

### 连接和退出数据库

链接：

```shell
# 该命令默认链接本机的 MongoDB 服务
mongo
```

退出：

```shell
# 在连接状态输入 exit 退出连接
exit
```

### 基本命令

+ `show dbs`
  + 查看显示所有数据库
+ `db`
  + 查看当前操作的数据库
+ `use 数据库名称`
  + 切换到指定的数据(如果没有会新建)
+ `show collections` 
  + 查看当前数据库
+ `db.文件名.find()`
  + 查看文件内容
+ `db.dropDatabase()`
  + 删除当前数据库，默认为 test
+ `db.collection.drop()`
  + 集合删除
+ 插入数据

### 在 Node 中如何操作 MongoDB 数据

### 使用官方的 `mongodb` 包来操作

> https://github.com/mongodb/node-mongodb-native

### 使用第三方 `mongoose` 来操作 `MongoDB` 数据库

第三方包： `mongoose` 基于 `MongoDB` 官方 `mongodb` 包再一次做了封装

+ 网址： https://mongoosejs.com/

#### 安装

```shell
npm i mongoose
```

#### hello world

```javascript
// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 创建一个模型， 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
// MongoDB 这个包就可以让设计编写过程变得非常简单
const Cat = mongoose.model('Cat', { name: String });


// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
```

#### 官方指南

##### 设计 Schema 发布 Model

```javascript
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1.链接数据库
// 指定连接的数据库不需要存在，当插入第一条数据之后会自动创建出来
mongoose.connect('mongodb://localhost:27017/itcast');

// 2.设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true  // 必须有，不能为空
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

/*
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
*/

// 3.将文档结构发布为模型
// mongoose.model 方法就是用来把一个架构发布为 model 
// 第一个参数： 传入一个大写名词单数字符串用来表示你的数据库名称
//             mongoose 会自动将大写名词字符串生成 小写复数 的集合名称
//             例如这里的 User 最终会变为 users 集合名称
// 第二个参数：架构 Schema

// 返回值：模型构造函数
var User = mongoose.model('User', userSchema)

// 4. 有了模型构造函数之后，就可以使用这个构造函数对 users集合中的数据为所欲为(增删改查)var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1.链接数据库
// 指定连接的数据库不需要存在，当插入第一条数据之后会自动创建出来
mongoose.connect('mongodb://localhost:27017/itcast');

// 2.设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true  // 必须有，不能为空
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

/*
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
*/

// 3.将文档结构发布为模型
// mongoose.model 方法就是用来把一个架构发布为 model 
// 第一个参数： 传入一个大写名词单数字符串用来表示你的数据库名称
//             mongoose 会自动将大写名词字符串生成 小写复数 的集合名称
//             例如这里的 User 最终会变为 users 集合名称
// 第二个参数：架构 Schema

// 返回值：模型构造函数
var User = mongoose.model('User', userSchema)

// 4. 有了模型构造函数之后，就可以使用这个构造函数对 users集合中的数据为所欲为(增删改查)
```

#####  增加数据

```javascript
var admin = new User({
  username: 'admin',
  password: '123456',
  email: 'admin@admin.com'
})

// admin.save().then(() => console.log('保存成功'))
admin.save(function (err, ret) {
  if (err) {
    console.log('文件保存失败')
  } else {
    console.log('文件保存成功')
    console.log(ret)
  }
})
```

##### 查询数据

查询所有

```javascript
// find 查询所有
User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```

按条件查询所有

```javascript
User.find({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```

按条件查询单个

```javascript
User.findOne({
  username: 'admin',
  password: '123456'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```

##### 删除数据

根据条件删除所有

```javascript
User.remove({
  username: 'zs'
}, function (err, ret) {
  if (err) { 
    console.log('文件删除失败') 
  } else {
    console.log('文件删除成功')
    console.log(ret)
  }
})
```

根据条件删除一个

```javascript
Model.findOneAndRemove(conditions,[options],[callback])
```

根据 id 删除一个

```javascript
Model.findByIdAndRemove(id, [options], [callback])
```

##### 更新数据

根据条件更新所有

```javascript
Model.update(conditions, doc, [options], [callback])
```

根据指定条件更新一个

```javascript
Model.findOneAndUpdate([conditions], [update], [options], [callback])
```

根据 id 更新一个

```javascript
User.findByIdAndUpdate('5d64cf132b1b5e27345aa7ce', {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
  }
})
```

#### 用户注册

+ 判断用户是否存在
  + 如果已存在，结束注册
  + 如果不存在，注册 (保存一条用户信息)

```javascript
User.findOne({
    username: 'admin'
})
.then(function (user) {
    if (user) {
    	// 用户已存在，不能注册
        console.log('用户已注册')
    } else {
        // 用户不存在，可以注册
        return new User({
            username: 'admin1',
            password: '123',
            email: '123@123.com'
        }).save()
    }
})
.then(function (ret) {
    
})
```



## 使用 Node 操作 MySQL  数据库

安装

```shell
npm install --save mysql
```

案例

```javascript
var mysql      = require('mysql');

// 1.创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rott',
  database : 'my_db'
});

// 2.连接数据库 打开冰箱门
connection.connect();
 
// 3.执行数据操作 把大象放到冰箱
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
// 4.关闭连接 关闭冰箱门
connection.end();
```



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

### Promise

> 参考文档： http://es6.ruanyifeng.com/#docs/promise

无法保证顺序的代码

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', (err, data) => {
  if (err) { /*return console.log('读取失败')*/
  	// 抛出异常
  		// 1.阻止程序的执行
  		// 2.把错误消息打印到控制台
		throw err
	}
  console.log(data)
})
fs.readFile('./data/b.txt', 'utf8', (err, data) => {
  if (err) return console.log('读取失败')
  console.log(data)
})
fs.readFile('./data/c.txt', 'utf8', (err, data) => {
  if (err) return console.log('读取失败')
  console.log(data)
})
```

通过回调嵌套的方式来保证顺序

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', (err, data) => {
  if (err) { /*return console.log('读取失败')*/
  	// 抛出异常
  		// 1.阻止程序的执行
  		// 2.把错误消息打印到控制台
		throw err
	}
  console.log(data)
  fs.readFile('./data/b.txt', 'utf8', (err, data) => {
	  if (err) return console.log('读取失败')
	  console.log(data)
		fs.readFile('./data/c.txt', 'utf8', (err, data) => {
		  if (err) return console.log('读取失败')
		  console.log(data)
		})
	})
})
```

为了解决以上编码方式带来的问题(回调地狱嵌套)，所以在 `EcmaScript 6` 中新增了一个API：`Promiose`

- `Promiose` 的英文就是承诺、保证的意思 (`I promiose you`)

Promiose 基本语法

```javascript
var fs = require('fs')
/*
在 EcmaScript 6 中新增了一个 API Promise
Promise 是一个构造函数
*/
// 创建 Promise 容器
// 1.给别人一个承诺 I promise you
	// Promise 容器一旦创建，就开始执行里面的代码
var p1 = new Promise(function (resolve, reject) {
	fs.readFile('./data/a.txt', 'utf8', function (err, data) {
		if (err) {
			// 失败了，承诺容器中任务失败了
			// conosle.log(err)
			// 把容器的 Peding 状态变为 Reject

			// 掉用 reject 就相当于了 then 方法的第二个参数
			reject(err)
		} else {
			// 承诺容器中的任务成功了
			// console.log(data)
			// 把容器的 Pending 状态改为 Resolve
			// 这里掉用的 resolve 方法实际上即使 then 方法传递的那个 function
			resolve(data)
		}
	})
})

// p1 就是承诺
// 当 p1 成功了 然后 (then) 做指定的操作
// then 方法接收的 function 即使容器中的 resolve 函数
p1.then(function (data) {
	console.log(data)
}, function (err) {
	console.log('读取文件失败了', err)
})
```

封装 `Promise` 版本的 `readFile`

```javascript
var fs = require('fs')

function pReadFile(filePath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) { reject(err) } 
			else { resolve(data) }
		})
	})
}

pReadFile('./data/a.txt')
	.then(function (data) {
		console.log(data)
		return pReadFile('./data/b.txt')
	})
	.then(function (data) {
		console.log(data)
		return pReadFile('./data/c.txt')
	})
	.then(function (data) {
		console.log(data)
	})
```



## 其它

### 修改完代码服务器自动重启

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

## 综合案例

### 目录结构

```
|-- app.js			   项目的入口文件
|-- controllers
|-- models			   存储使用 mongoose 设计的数据模型
|-- node_modules       第三方包
|-- package.json       包描述文件
|-- package-lock.json  第三方包版本锁定文件
|-- public             公共的静态资源
|-- README.md          项目说明文档
|-- routes			   若果业务比较多，代码量大，最好把路由按照业务的分类存储到 routes 目录中
|-- router.js		   简单一点把所有的路由都放到这个文件
|-- views              存储视图目录
```

### 模板页

+ [art-template 子模板]([https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF](https://aui.github.io/art-template/zh-cn/docs/syntax.html#子模板))

+ [art-template模板继承]([https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF](https://aui.github.io/art-template/zh-cn/docs/syntax.html#模板继承))

### 路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登录 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /register | GET  |         |                           |              | 渲染注册页面 |
| /register | POST |         | email、nickname、password |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登录页面 |
| /login    | POST |         | email、posswoed           |              | 处理登录请求 |
| /logout   | GET  |         |                           |              | 处理退出请求 |

### 模板设计

### 功能实现

### 书写步骤

+ 创建目录结构
+ 整合静态页-模板页
  + include
  + block
  + extend
+ 设计用户登录、退出、注册路由
+ 用户注册
  + 先处理好客户端页面的内容（表单控件的 name、收集表单数据、发起请求）
  + 服务端
    + 获取客户端表单请求的数据
    + 操作数据库
      + 如果有错，发送 500 告诉客户端服务器出错
      + 其他的根据业务不同的响应数据
+ 用户登录
+ 用户退出