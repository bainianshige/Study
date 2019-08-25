// app application 应用程序
// 把当前模块所有的依赖项都声明在文件模块最上面
// 为了让目录结构保持统一清晰，约定把所有的 html 文件都放到 views (视图)目录中
// 为了方便的统一处理静态资源，所以约定把所有的静态资源都存放在 public 目录中
// 那些资源能被用户访问，哪些资源不能被用户访问，可以通过代码来进行非常灵活的控制

// index.html
// public 整个 public 目录中的资源都允许被访问
// 前后端融会贯通 为所欲为


let http = require('http')
let fs = require('fs')
let template = require('art-template')
let url = require('url')


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

// 对于 form 表达提交的请求路径，由于其中具有用户动态填写的内容，不能通过判断完整的 url 路径来处理这个请求
// 结论：只需要判定请求路径是 /pinglun ，就可以认为这是提交表单的请求


http
  .createServer((req, res) => { //简写方式，该函数直接注册 server 
    /*使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象 (通过 query 属性来访问)*/
    let parseObj = url.parse(req.url, true)
    // console.log(parseObj)
    // 单独获取不包含查询字符串的路径部分 (该路径不包含 ？ 之后的内容)
    let pathname = parseObj.pathname

    if (pathname === '/') { /*渲染响应首页*/
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          res.end('404 Not Found')
        }
        let htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } else if (pathname === '/post') { 
      fs.readFile('./views/post.html', (err, data) => {
        if (err) {
          return res.end('404 Not Found')
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      // 统一处理：如果请求路径是以 /public/ 开头，认为是要获取 public 中的某个资源，所以直接可以把请求路径当做文件路径来直接进行读取
      fs.readFile('.' + pathname, (err, data) => {
        if (err) {
          res.end('文件读取失败')
        }
        res.end(data)
      })
    } else if (pathname === '/pinglun') {
      // 注意：这个时候无论 /pinglun? 之后是什么，pathname 都等于 /pinglun ，因为 pathname 不包含 ? 之后的路径

      // 一次请求对应一次响应，响应结束这次请求也结束了
      // res.end(JSON.stringify(parseObj.query))

      // 使用 url 模块中的 parse 方法把请求路径中的查询字符串解析成一个对象
      // 加下来要做的是： 获取表单提交的数据(parseObj.query)  生成日期到数据对象中 存储到数组中 
      let comment = parseObj.query
      comment.dateTime = '2019年8月23日13:25:10'
      comments.unshift(comment)
      // 让用户重定向跳转到首页，当用户重新请求 / 的时候，数组中的数据已经发生变化，所以用户看到的页面是重新渲染的页面

      /*
      如何通过服务器让客户端重定向？
        1.状态码设置为 302 临时重定向 (statusCode)
        2.在响应头中通过 Location 告诉客户端往哪里重定向 (setHeader)
      如果客户端发现收到服务器的响应的状态码是 302 就会自动取响应头中找 Location，然后对该地址发送新的请求，就能看到客户端自动跳转
      */
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else {
      // 其他的都处理成404
      fs.readFile('./views/404.html', (err, data) => {
        if (err) {
          return res.end('404 Not Found')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, () => {
    console.log('running...')
  })

/*
  1. / index.html
  2. 开放 public 目录中的静态资源
      当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
  3. /post post.html
  4. /pinglun 
      4.1 接收表单提交数据
      4.2 存储表单提交的数据
      4.3 让表单重定向到 / 
        statusCode
        setHeader
*/