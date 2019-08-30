var express = require('express')

var app = express()

// 中间件： 处理请求，本质就是个函数
// 在 Express 中，对中间件有几种分类
// 当请求进来，会从第一个中间件开始匹配
//   如果匹配，就进来
//     如果请求进入到中间件之后，没有调用 next 方法，则代码就会定在当前中间件
//     如果调用了 next 则继续向后找第一个匹配的中间件
//   如果不匹配，则继续判断匹配下一个中间件

// 不关心请求路径和请求方法的中间件
  // 任何请求都会进入这个中间件
  // 中间件本身是一个方法，方法接收三个参数
    // Request 请求对象
    // Response 响应对象
    // Next 下一个中间件
  // 当一个请求进入中间件之后，如果不调用 Next() 则会停留在当前中间件
  // 所以 next 是一个方法，用来调用下一个中间件的
  // 调用 next 也是要匹配的（不是调用紧挨着的那一个）

  // app.use((req, res, next) => {
  //   console.log('1')
  //   next()
  // })

  // app.use((req, res, next) => {
  //   console.log('2')
  // })

// 关心请求路径的中间件 (以 /xxx 开头的路劲中间件)
  // app.use('/a', function (req, res, next) {
  //   console.log(req.url)
  // })

// 除了以上中间件之外，还有一种最常用的
// 严格匹配请求方法和请求路径的中间件
// app.get()
// app.post()

// app.use((req, res, next) => {
//   console.log(1)
// })

app.get('/', (req, res, next) => {
  console.log('/')
})

app.get('/a', (req, res, next) => {
  console.log('/a')
  req.foo = 'bar'
  next()
})

app.get('/a', (req, res, next) => {
  console.log(req.foo)
})


app.listen(3000, () => {
  console.log('app 3000 running...')
})