var fs = require('fs')


/*
在 EcmaScript 6 中新增了一个 API Promise
Promise 是一个构造函数
*/

// 创建 Promise 容器
// 1.给别人一个承诺 I promise you
	// Promise 容器一旦创建，就开始执行里面的代码
var p1 = new Promise(function (resolve, reject) {
	fs.readFile('./data/a.txt', 'utf8', function (err, data) {
		if (err) {
			// 失败了，承诺容器中任务失败了
			// conosle.log(err)
			// 把容器的 Peding 状态变为 Reject

			// 掉用 reject 就相当于了 then 方法的第二个参数
			reject(err)
		} else {
			// 承诺容器中的任务成功了
			// console.log(data)
			// 把容器的 Pending 状态改为 Resolve
			// 这里掉用的 resolve 方法实际上即使 then 方法传递的那个 function
			resolve(data)
		}
	})
})

var p2 = new Promise(function (resolve, reject) {
	fs.readFile('./data/b.txt', 'utf8', function (err, data) {
		if (err) { reject(err) } 
		else { resolve(data) }
	})
})

var p3 = new Promise(function (resolve, reject) {
	fs.readFile('./data/c.txt', 'utf8', function (err, data) {
		if (err) { reject(err) } 
		else { resolve(data) }
	})
})

// p1 就是承诺
// 当 p1 成功了 然后 (then) 做指定的操作
// then 方法接收的 function 即使容器中的 resolve 函数
p1
	.then(function (data) {
	console.log(data)
	// 当 p1 读取成功的时候
	// 当前函数中 return 的结果就是可以在后面的 then 中 function 接收到
	// 当 return 一个 Promise 对象的时候，后续的 then 中的方法的第一个参数会作为 p2 的resolve
	return p2
	}, function (err) {
		console.log('读取文件失败了', err)
	})
	.then(function (data) {
		console.log(data)
		return p3
	})
	.then(function (data) {
		console.log(data)
	})
