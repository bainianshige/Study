// require 是一个方法
// 他的作用就是用来加载模块的
// 在 node 中，模块有三种 
// 	具名的核心模块，例如  fs、http
// 	用户自己编写的文件模块
 // 在 node 中，没有全局作用域，只有模块作用域(外部访问不到内部，内部也访问不到外部)


// 相对路径必须加 ./ 
var foo = 'aaa'
console.log('a start')
function add(x, y) {
	return x + y
}
require('./b.js')
console.log('a end')
console.log('foo 的值是：', foo)