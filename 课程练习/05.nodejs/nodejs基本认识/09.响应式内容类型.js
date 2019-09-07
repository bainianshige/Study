/*let http = require('http')

let server = http.createServer();

server.on('request', (req, res) => {
  // 在服务端默认发送的数据，其实是 utf8 编码的内容
  // 但是浏览器不知道你是 utf8 编码的内容
  // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是 gbk
  // 解决方法就是正确的告诉浏览器内容编码
  // 在 http 协议中，content-type 就是用来告知对方我给你发送的数据内容是什么类型
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // res.end('hello 是的你卡罗纳')

  let url = req.url
  if (url === '/plain') {
    console.log(url)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('hello 是的你卡罗纳')
  } else if (url === '/html') {
    // 如果发送的是 html 格式的字符串，也要告诉浏览器字符编码 charset=utf-8 和内容格式 text/html
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<p>hello html <a href="">点我</a></p>')
  }


}).listen(3000, () => {
  console.log('Server is running...')
})
*/


/*------------------------------------*/
let fs = require('fs')
let http = require('http')

let server = http.createServer()

server.on('request', (req, res) => {
  // / index.html

  let url = req.url

  if (url === '/') {
    // 发送文件里面的内容
    fs.readFile('./resource/index.html', (err, data) => {
      if (err) {
        res.setHeader('Content-Tyoe', 'text/plain; charset=utf-8')
        res.end('文件读取失败')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为能认识的字符串
        // res.end() 支持两种数据类型，一种是二进制，一种是字符串
        res.setHeader('Content-Tyoe', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/image') {
    // url:统一资源定位符
    // 一个 url 最终要对应得到一个资源
    fs.readFile('./resource/image.jpg', (err, data) => {
      if (err) {
        res.setHeader('Content-Tyoe', 'text/plain; charset=utf-8')
        res.end('文件读取失败')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为能认识的字符串
        // res.end() 支持两种数据类型，一种是二进制，一种是字符串
        // 图片不需要指定编码，因为编码一般指的是：字符编码
        res.setHeader('Content-Tyoe', 'image/jpeg')
        res.end(data)
      }
    })
  }
}).listen(3000, () => {
  console.log('server running...')
})