/*
  app.js 入门模块
  职责： 
    启动服务
    做一些服务相关配置
      模板引擎
      body-parser 解析表单 post 请求体
      提供静态资源服务
    挂载路由
    监听端口启动服务
*/


var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.engine('html', require('express-art-template'))

app.use('/node_modules/', express.static('./node_modules'))
app.use('/public/', express.static('./public'))

// 配置模板引擎和 body-parser 一定要在路由 app.use(router) 之前挂载
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// router(app)
// 把路由容器挂载到 app 服务中
app.use(router)

app.listen(3000, () => {
  console.log('app running...')
})