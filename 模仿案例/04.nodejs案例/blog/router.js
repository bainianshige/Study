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
  res.render('index.html')
})

router.get('/logout', (req, res) => {
  res.render('index.html')
})

module.exports = router