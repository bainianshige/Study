/*require 是一个方法
他的作用就是用来加载模块的
在 node 中，模块有三种 
	具名的核心模块，例如  fs、http
	用户自己编写的文件模块
*/

/* 在 node 中，没有全局作用域，只有模块作用域(外部访问不到内部，内部也访问不到外部)
 默认都是封闭的作用域，加载文件模块使用里面的成员(方法)*/

/*相对路径必须加 ./ 
可以省略后缀名
相对路径中的./不能省略
var foo = 'aaa'
console.log('a start')
// function add(x, y) {
// 	return x + y
// }
require('./b.js')
console.log('a end')
console.log('foo 的值是：', foo)*/


/*require 方法有两个作用:
  1.加载文件模块并执行里面的代码
  2.拿到被加载文件模块导出的接口对象

  在每个文件模块中都提供一个对象：exports
  exports 默认是一个空对象
  要做的就是把所有需要被外部访问的成员挂载到 exports 对象中
  */
let bExports = require('./b.js')

console.log(bExports.add(10, 20))

