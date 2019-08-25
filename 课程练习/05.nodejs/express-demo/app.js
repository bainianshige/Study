// 0. 安装
// 1. 引包
let express = require('express')

// 2. 创建服务器应用程序，也就是原来的 http.createSercer
var app = express()

/*
// 在 Express 中开放资源就是一个 API 就能解决
// 公开指定目录
// 只要下面一段代码，就能通过 /public/xx 的方式访问 public 目录中的所有资源
app.use('/public/', express.static('./public/'))

// 模板引擎，在 Express 也是一个 API 就能解决

// 当服务器收到 get 请求 / 的时候，执行回调函数
app.get('/', function (req, res) {
  res.send('hello express')
})

app.get('/about', function (req, res) {
  res.send('hello about')
})
*/

app.get('', function (req, res) {
  // res.end('hello world')

  res.send('hello world')
})

app.get('/login', (req, res) => {
  res.send(`
  <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Document</title></head><body><h1>hello login</h1></body></html>
  `)
})

// 静态服务
// 当以 /public/ 开头的时候，去 ./public/ 目录中查找对应的资源
// 这种方式更容易辨识，推荐这种方式
// app.use('/public/', express.static('./public/'))

// 必须是 /a/public 目录中的资源具体路径 通过 /a/ 访问 public 目录中的文件
// app.use('/a/', express.static('./public/'))

// 当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问
// 这种方式的好处就是可以省略 /public/
// app.use(express.static('./public'))

// 相当于 server.listen
app.listen(3000, function () {
  console.log('app.running...')
})
