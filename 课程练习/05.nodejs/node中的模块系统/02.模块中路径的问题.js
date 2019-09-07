let fs = require('fs')

// 使用的文件操作的 API 都是异步的
// 文件操作中的相对路径省略 ./
fs.readFile('node_modules/art-template/index.js', (err, data) => {
  if (err) {
    return console.log('读取文件失败')
  }
  console.log(data.toString())
})

