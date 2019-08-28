var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 注意：这里这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法： Date.now
    // 当去 new model 的时候，如果没有传递 create_time
    // 则 mongoose 就会调用 default 制定的  Date.now 方法
    // 使用其返回值作为默认值
    default: Date.now
  },
  last_modifyed_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.module('User', userSchema)
