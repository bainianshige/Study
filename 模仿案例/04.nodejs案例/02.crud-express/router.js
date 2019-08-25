/*
  router.js 路由模块
  职责：
    处理路由
      根据不同的请求方法 + 请求路径设置具体的请求处理函数
  模块职责要单一， 不要乱写
  划分模块的目的就是为了增强项目代码的可维护性
  提升开发效率
*/

var fs = require('fs')

// Express 提供了更方便的方式，专门用来包装路由
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
router.get('/students', (req, res) => {
  // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
  // 也可以通过 data.toString() 的方法
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) return re.status(500).send('Server error')
    
    // 从文件中读取到的数据一定是字符串，这里一定要手动转成对象
    var students = JSON.parse(data).students

    res.render('index.html', {
    fruits: [
      '苹果',
      '香蕉',
      '橘子'
    ],
    students: students
    })
  })
})

router.get('/students/new', (req, res) => {
  res.render('new.html')
})

router.post('/students/new', (req, res) => {
  // 1. 获取表单数据
  // 2. 处理
     // 将数据保存到 db.json 文件中用以持久化
  // 3. 发送表单响应
  
  // 先读取出来，转成对象， 然后往对象中 push 数据，然后把对象再转为字符串，然后把字符串再次写入文件
  
})

router.get('/students/edit', (req, res) => {
  res.send('new new new')
})

router.post('/students/edit', (req, res) => {
  res.send('new new new')
})

router.get('/students/delete', (req, res) => {
  res.send('new new new')
})

// 3. 把 router 导出
module.exports = router

// 这样不方便
  // module.exports = function (app) {
  //   app.get('/students', (req, res) => {
  //     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
  //     // 也可以通过 data.toString() 的方法
  //     fs.readFile('./db.json', 'utf8', (err, data) => {
  //       if (err) return re.status(500).send('Server error')
        
  //       // 从文件中读取到的数据一定是字符串，这里一定要手动转成对象
  //       var students = JSON.parse(data).students

  //       res.render('index.html', {
  //       fruits: [
  //         '苹果',
  //         '香蕉',
  //         '橘子'
  //       ],
  //       students: students
  //       })
  //     })
  //   })

  //   app.get('/')
  // }

