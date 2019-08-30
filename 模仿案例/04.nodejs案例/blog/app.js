const express = require('express')
const path = require('path')
const router = require('./router.js')
const bodyParser = require('body-parser')
const session = require('express-session')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 在 Node 中，与很多第三方的模板引擎都可以使用，不只有 art-template
// ejs、 pug、 handlebars、 nunjucks
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))  // 默认就是 ./views 目录

// 配置解析表单 POST 请求体 插件 req.body 获取数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方插件： express-session 来解决
// 1.npm install express-session
// 2.配置(一定要在路由挂载之前)
// 3.使用
  // 当把这个插件配置好之后，就可以通过 req.session 来访问和设置 Session 成员
  // 添加 Session 数据: req.session.foo = 'bar'
  // 访问 Session 数据: req.session.foo

app.use(session({
  // 配置加密字符串，会在原有的加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itchengeng', 
  resave: false,
  saveUninitialized: true // 无论是否使用 Session ，都会默认直接分配一把钥匙
}))


// 把路由挂载到 app 中
app.use(router)


// 配置一个处理 404 的中间件
app.use(function (req, res) {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
// 当调用 next 的时候，如果传递了参数，则直接往后找到带有 四个参数的应用程序级别的中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(5000, () => {
  console.log('app 5000 running...')
})
