/*
let foo = 'bar'

function add(x, y) {
	return x + y
}

// 只能获取到挂载在 exports 上的成员，这样做的目的是为了解决变量命名冲突的问题
// exports add = add


// exports 是一个对象，可以通过多次为这个对象添加成员实现对外导出多个内部成员
// exports.str = 'hello'

// 现在有一个需求：希望加载直接得到一个： 方法、 字符串、 数字、 数组
// 如果需要一个模块需要直接导出某个成员，而非挂载

module.exports = 'hello'
// 后者会覆盖前者
module.exports = add

module.exports = {
  add: function (x, y) {
    return x + y
  },
  str: 'hello'  
}
*/

/*原理---------------------------------------------------*/

// 在node中,每个模块内部都有一个自己的 nodule 对象
// 在 module 对象中,有一个成员叫: exports 也是一个对象
// 需要对外导出成员，需要把导出的成员挂载到 module.exports 中

// 每次导出成员的时候都通过 module.exports.xxx = xxx 很麻烦
// 所以 node 为了简化操作,提供了一个变量 exports = module.exports

/*
let module = {
  exports: {

  }
}
*/

/*
在模块中有 let exports = module.exports

console.log(exports === module.exports) 结果为 ture

对象的重新赋值
module.exports.foo = 'hello'

module.exports.add = (x, y) => {
  return x + y
}

谁来 require，谁就得到 module.exports
默认在代码的最后有一句
return module.exports
因为 exports 是对 module.exports 的一个引用，所用不能给 exports 重新赋值，会丢失引用关系
同理，给 module.exports 重新赋值，也会丢失引用关系
*/

// 当一个模块需要导出单个成员的时候

// module.exports = 'hello'

// exports.foo = 'world'


/*
exports.foo = 'bar'

module.exports.a = 123

//exports !== module.exports 最终 return 是 module.exports
exports = {
  a: 456
}

module.exports.foo = 'haha'

exports.c = 456

//重新建立了引用关系
exports = module.exports

exports.a = 789



去使用的时候：实在理不清直接忘掉 exports
  导出多个成员多次使用: exports.xxx = xxx
  也可以写为: module.exports = {}
  导出单个成员: modul.exports
*/