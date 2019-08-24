// 使用 node 构建一个 web 服务器
// 在 node 中专门提供了一个核心模块： http
// http 这个核心模块的职责就是帮你创建编写服务器


// 1.加载 http 核心模块
let http = require('http');

// 2.使用 http.createServer() 方法创建一个 web 服务器
// 	返回一个server实例

let server = http.createServer();

// 3.服务器提供服务：对数据的服务
		// 发送请求		接受请求  处理请求  发送响应
		// 注册 request 请求事件
		// 当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数

// request 请求事件处理函数，需要接受两个参数:
// 	Request 请求对象 ：可以用来获取客户端的一切请求信息，例如请求路径
//  Response 响应对象 ：可以用来给客户端发送响应消息
server.on('request', (request, response) => {
	// http://192.168.1.11:3000/
	// http://192.168.1.11:3000/a /a
	// http://192.168.1.11:3000/foo/a /foo/a
	console.log('收到客户端的请求了,请求对象是：' + request.url)

	//response 对象有一个方法： write 可以用来给客户端发送响应数据
	//write 可以使用多次，但是最后一次一定要使用 end 来结束响应，否则客户端会一直等待
	response.write('hello')
	response.write(' nodejs')

	// 告诉客户端，结束这次响应
	response.end('-------')

	
});

// 4.绑定端口号，启动服务器
server.listen(3000, () => {
	console.log('服务器启动成功了，可以通过http://192.168.1.11:3000/ 来进行访问')
})