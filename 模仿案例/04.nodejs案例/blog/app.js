const express = require('express')
const path = require('path')
const router = require('./router.js')
const bodyParser = require('body-parser')

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

// 把路由挂载到 app 中
app.use(router)

app.listen(5000, () => {
  console.log('app 5000 running...')
})
