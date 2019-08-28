const express = require('express')
const fs = require('fs')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  res.render('index.html')
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res) => {
  // 1.获取表单提交的数据
  
  // 2.操作数据库
  // 3.发送相应

})

router.get('/logout', (req, res) => {
  res.render('index.html')
})

module.exports = router