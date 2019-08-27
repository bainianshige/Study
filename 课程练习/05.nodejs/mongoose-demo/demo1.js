// 引包
const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 创建一个模型， 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
// MongoDB 这个包就可以让设计编写过程变得非常简单
const Cat = mongoose.model('Cat', { name: String });


// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));


// for (var i = 0; i < 100; i++) {
//   // 实例化一个 Cat
//   const kitty = new Cat({ name: '喵喵' + i });
  
//   // 持久化保存 kitty 实例
//   kitty.save().then(() => console.log('meow'));
// }