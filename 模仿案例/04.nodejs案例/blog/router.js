const express = require('express')
const User = require('./models/user.js')
const md5 = require('blueimp-md5')
const fs = require('fs')

const router = express.Router()

router.get('/', (req, res) => {
  // console.log(req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body
  User.findOne({
    email: body.email, 
    password: md5(md5(body.password))
  }, (err, user) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }

    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'email er password is invalid'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登录状态
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'Ok'
    })
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res) => {
  // 1.获取表单提交的数据（req.body）
  // 2.操作数据库
    // 判断该用户是否存在
    // 如果已存在，不允许注册
    // 如果不存在，注册新建用户
  // 3.发送相应
  var body = req.body
  User.findOne({
    $or: [
      {
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    if (data) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error'
        })
      }

      // 注册成功，使用 Session 记录用户的登录状态
      req.session.user = user

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，他会自动把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'Ok'
      })
    })
  })
})

// router.post('/register', async (req, res) => {
//   // 1.获取表单提交的数据（req.body）
//   // 2.操作数据库
//     // 判断该用户是否存在
//     // 如果已存在，不允许注册
//     // 如果不存在，注册新建用户
//   // 3.发送相应
//   var body = req.body
//   try {
//     if (await  User.findOne({email: body.email})) {
//       return res.status(200).json({
//         err_code: 1,
//         message: '邮箱已存在'
//       })
//     }

//     if (await  User.findOne({nickname: body.nickname})) {
//       return res.status(200).json({
//         err_code: 2,
//         message: '昵称已存在'
//       })
//     }

//     // 对密码进行 md5 重复加密
//     body.password = md5(md5(body.password))

//     await new User(body).save()
     
//     // Express 提供了一个响应方法：json
//     // 该方法接收一个对象作为参数，他会自动把对象转为字符串再发送给浏览器
//     res.status(200).json({
//       err_code: 0,
//       message: 'Ok'
//     })
//   } catch (err) { 
//     res.status(500).json({
//       err_code: 500,
//       message: 'Internal error'
//     })
//   }
// })


router.get('/logout', (req, res) => {
  // 清除登录状态
  req.session.user = null

  // 重定向到登录页
  res.redirect('/login')
})

module.exports = router
