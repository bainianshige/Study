let fs = require('fs')
let http = require('http')

let server = http.createServer()
// 定义文件所在目录
let resource = 'D:/code/Study/课程练习/05.nodejs/resource'

server.on('request', (req, res) => {
  // 文件读取路径
  let url = req.url
  // 默认文件读取路径
  let filePath = '/index.html'

  if (url !== '/') {
    filePath = url
  }

  fs.readFile(resource + url, (err, data) => {
    if (err) {
      res.end('404 Not Found')
    }
    // 1.得到请求目录中的文件名和目录名(fs.readDir)
    // 2.将得到的文件名和目录名替换到 template.html 模板页面中
    fs.readdir(resource, (err, files) => {
      if (err) return
      res.end(files.toString())
    })
  })

}).listen(3000, () => {
  console.log('server running...')
})