/*
  students.js
  数据操作文件模块
  职责：操作文件中的数据，只处理数据，不关心业务

  这里是学习 Node 的精华所在：封装异步 API

*/

var fs = require('fs')

var dbPath = './db.json'

/*
  获取所有学生列表
  callback 中的参数
    第一个是 err 
      成功是 null； 错误是错误对象
    第二个参数是 结果
      成功是 数组； 错误是undefined
  return []
*/
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    // JSON.parse(data).students  
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/*
  根据ID获取单个学生
*/
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data).students
    var stu = students.find(function (element) {
      return element.id === parseInt(id)
    })
    callback(null, stu)
  })
}

/*
  添加保存学生
*/
exports.save = function (student, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    // 处理 ID 问题，唯一的，不重复
    student.id = students[students.length - 1].id + 1

    // 把调用者传过来的 student 保存到 students 对象中
    students.push(student)

    // 把对象转换成字符串
    var fileDate = JSON.stringify({
      students: students
    })

    // 把字符串写入文件
    fs.writeFile(dbPath, fileDate, function (err) {
      // 错误就把错误对象往上传递
      if (err) return callback(err)
      // 成功就把错误对象置空
      callback(null)
    })
  })
}

/*
  更新(修改)学生
*/
exports.updataById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data).students

    // 注意：把 id 统一转化为数字类型
    student.id = parseInt(student.id)

    // 把需要修改的学生找出来，通过id
    // EcmaScript 6 中的一个数组方法:find
    // 需要接受一个函数作为参数
    // 当某个遍历项符合条件( element.id === student.id )的时候，find 会终止遍历，同事返回遍历项
    var stu = students.find(function (element) {
      return element.id === parseInt(student.id)
    })

    for (var key in student) {
      stu[key] = student[key]
    }

    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, (err) => {
      if (err) return callback(err)
      callback(null)
    })

  })
}

/*
  删除学生
*/
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data).students

    // findIndex 方法专门用来根据条件查找元素的下标
    var deleteId = students.findIndex(function (element) {
      return element.id === parseInt(id)
    })
    
    // 根据下标从数组中删除对应的学生对象
    students.splice(deleteId, 1)

    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, (err) => {
      if (err) return callback(err)
      callback(null)
    })
  })
}