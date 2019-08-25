// console.log('b start')
// require('./c.js')
// console.log('b end')

//----------------------------
// 加载与导出
let foo = 'bbb'

//exports.foo = 'hello'
// console.log(exports)

// 动态为 exports 添加成员  名字为foo 值为'hello'
exports.foo = 'hello'

exports.add = (x, y) => {
  return x + y
}
