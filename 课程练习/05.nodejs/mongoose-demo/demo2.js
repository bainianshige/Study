var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1.链接数据库
// 指定连接的数据库不需要存在，当插入第一条数据之后会自动创建出来
mongoose.connect('mongodb://localhost:27017/itcast', {useNewUrlParser: true});

// 2.设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true  // 必须有，不能为空
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

/*
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
*/

// 3.将文档结构发布为模型
// mongoose.model 方法就是用来把一个架构发布为 model 
// 第一个参数： 传入一个大写名词单数字符串用来表示你的数据库名称
//             mongoose 会自动将大写名词字符串生成 小写复数 的集合名称
//             例如这里的 User 最终会变为 users 集合名称
// 第二个参数：架构 Schema

// 返回值：模型构造函数
var User = mongoose.model('User', userSchema)

// 4. 有了模型构造函数之后，就可以使用这个构造函数对 users集合中的数据为所欲为(增删改查)

// 增加数据--------------------------------------
  // var admin = new User({
  //   username: 'admin',
  //   password: '123456',
  //   email: 'admin@admin.com'
  // })

// admin.save().then(() => console.log('保存成功'))
// 持久化数据
  // admin.save(function (err, ret) {
  //   if (err) {
  //     console.log('文件保存失败')
  //   } else {
  //     console.log('文件保存成功')
  //     console.log(ret)
  //   }
  // })

// 查询数据--------------------------------------
// find 查询所有
  // User.find(function (err, ret) {
  //   if (err) {
  //     console.log('查询失败')
  //   } else {
  //     console.log(ret)
  //   }
  // })

// find 条件查找所有
  // User.find({
  //   username: 'zs'
  // }, function (err, ret) {
  //   if (err) {
  //     console.log('查询失败')
  //   } else {
  //     console.log(ret)
  //   }
  // })

// findOne 条件查找单个
  // User.findOne({
  //   username: 'admin',
  //   password: '123456'
  // }, function (err, ret) {
  //   if (err) {
  //     console.log('查询失败')
  //   } else {
  //     console.log(ret)
  //   }
  // })

// 删除数据--------------------------------------
  // User.remove({
  //   username: 'zs'
  // }, function (err, ret) {
  //   if (err) { 
  //     console.log('文件删除失败') 
  //   } else {
  //     console.log('文件删除成功')
  //     console.log(ret)
  //   }
  // })

// 更新(修改)数据--------------------------------------
  // User.findByIdAndUpdate('5d64cf132b1b5e27345aa7ce', {
  //   password: '123'
  // }, function (err, ret) {
  //   if (err) {
  //     console.log('更新失败')
  //   } else {
  //     console.log('更新成功')
  //   }
  // })
