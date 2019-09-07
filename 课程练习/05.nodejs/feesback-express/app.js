var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/', express.static('./public'))

// 配置使用 art-template 模板引擎
// 第一个参数表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中的
// 虽然这里不需要加载 art-template ，也必须安装 
// 原因在于这个包 express-art-template 依赖了 art-template

app.engine('html', require('express-art-template'))

// Express 为 Respense 响应对象提过你干了一个方法： render
// render 方法默认是不可以使用的，配置过模板引擎就可以使用
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找模板文件
// 也就是说 Express 有一个约定： 开发人员把所有的视图文件都放到 views 目录中

// 如果想要修改默认的 views 目录
// app.set('views', render函数的默认路径)

// 配置 body-parser 中间件(插件，专门用来解析表单 POST 请求体)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

let comments = [
  {
    name: 'zhangsan',
    message: '今天天气不错',
    dateTime: '2020-2-6',
  },
  {
    name: 'zhangsan',
    message: '今天天气不错',
    dateTime: '2020-2-6',
  },
]

app.get('', (req, res) => {
  res.render('index.html', {
    comments: comments
  })
})

app.get('/post', (req, res) => {
  res.render('post.html')
})

// app.get('/pinglun', (req, res) => {
//   var comment = req.query
//   comment.dateTime = '2019-11-5 10:11:45'
//   comments.unshift(comment)
//   res.redirect('/')
//   // res.statusCode = 302
//   // res.setHeader('Location', '/')
// })

// 当以 POST 请求 /post 的时候，执行指定的处理函数
// 这样就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post', (req, res) => {
  // 1.获取表单 POST 请求数据
  // 2.处理
  // 3.发送请求响应

  // req.query 只能拿 get 请求参数
  var comment = req.body
  comment.dateTime = '2019-11-5 10:11:45'
  comments.unshift(comment)
  res.redirect('/')

  // res.send
  // res.redirect
  // 这些方法 EXpress 会自动结束响应
})
app.listen(3000, () => {
  console.log('app running...')
})