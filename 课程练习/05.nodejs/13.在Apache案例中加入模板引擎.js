let fs = require('fs')
let http = require('http')
let template = require('art-template')

let server = http.createServer()
// 定义文件所在目录
let resource = 'D:/Course/Front End/Git-Study/课程练习/05.nodejs/resource'

server.on('request', (req, res) => {
  // 文件读取路径
  let url = req.url
  // 默认文件读取路径
  let filePath = '/index.html'

  fs.readFile('./resource/template.html', (err, data) => {
    if (err) {
      return res.end('404 Not Found')
    }
    // 1.得到请求目录中的文件名和目录名(fs.readDir)
    // 2.将得到的文件名和目录名替换到 template.html 模板页面中
    fs.readdir(resource, (err, files) => {
      if (err) {
        return res.end('没有找到当前路径')
      }
      // 这里需要用模板引擎解析替换 data 中的模板字符串就可以了
      // 数据就是files, template.html 文件中编写模板语法就可以了
      let htmlStr = template.render(data.toString(), {
        title: '哈哈',
        files: files
      })
      // 3.发送解析替换过后的响应数据
      res.end(htmlStr)
    })
    
  })
}).listen(3000, () => {
  console.log('server running...')
})