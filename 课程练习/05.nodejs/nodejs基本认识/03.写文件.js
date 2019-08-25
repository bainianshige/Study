let fs = require('fs');


// $.ajax({
// 	...
// 	success: (data) => {
// 	}
// });

// terminal插件

// 第一个参数：文件路径
// 第二个参数：文件内容
// 第三个参数：回调函数
	// 成功：文件写入成功
	// 失败：error 错误对象
fs.writeFile('./data/你好.md', '欢迎看我', (error) => {
	if (error) {
		console.log('写入失败')
	} else {
		console.log('写入成功')
	}
});