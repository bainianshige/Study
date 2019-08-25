let http = require('http')

// 1.创建 Server
let server = http.createServer()
// 2.监听 request 请求事件，设置请求处理函数
server.on('request', (req, res) => {
	// console.log('收到请求，请求路径：' + req.url)

	// 根据不同的请求路径发送不同的响应结果
	// 获取请求路径，判断路径处理响应
	// req.url 获取到的是端口号之后的那一部分路径，也就是说所有的 url 都是以 / 开头的
	let url = req.url;


	// res.end(url);
	// if (url === '/') {
	// 	res.end('index page');
	// } else if (url === '/login') {
	// 	res.end('login page');
	// } else {
	// 	res.end('404 Not Found.');
	// }

	if (url === '/products') {
		var products = [
		{
			name: '苹果 X',
			price: 8888
		},
		{
			name:  '菠萝 X',
			price: 5000
		},
		{
			name:  '小辣椒 X',
			price: 1999
		}
		]
		// 响应内容只能是二级制数据或者字符串
		// 数字 对象 数组 布尔值 都不行
		res.end(JSON.stringify(products));
	}
})
// 3.绑定端口号，启动服务
server.listen(3000, () => {
	console.log('服务器启动成功')
})
