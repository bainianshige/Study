function ajax(obj) {
	//默认参数
	var defaults = {
		type: 'get',
		data: {},
		url: '#',
		dataType: 'text',
		async: true,
		success: function (data) {console.log(data)}
	}
	//处理形参，传递参数的时候就会覆盖默认参数，不传递使用默认参数
	for (var key in obj) {
		// statement
		defaults[key] = obj[key];
	}
	//1.创建XMLHttpRequest对象
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//把对象形式的参数转化为字符串形式的参数
	//对象格式：{username:'zhangsan',password:123}
	//转化为：username=zhangsan
	var param = '';
	for (var attr in obj.data) {
		// statement
		param += attr + '=' + obj.data[attr] + '&';
	}
	if (param) {
		param = param.substring(0, param.length - 1);
	}
	//处理get请求参数并且处理中文乱码问题
	if (defaults.type == 'get') {
		defaults.utl += "?" + encodeURI(param);
	}
	//2.准备发送(设置发送的参数)
	xhr.open(defaults.type, defaults.url, defaults.async);
	//处理post请求参数并且设置请求头信息(必须设置)
	var data = null;
	if (defaults.type == 'post') {
		data = param;
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	//3.执行发送的动作
	xhr.send(data);
	//处理同步请求，不会调用回调函数，直接return responseText
	if (!defaults.async) {
		if (defaults.dataType == 'json') {
			return JSON.parse(xhr.responseText);
		} else {
			return xhr.responseText;
		}
	}

	//4.设置回调函数(处理服务器相应的数据)
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var data = xhr.responseText;
			if (defaults.dataType == 'json') {
				data = JSON.parse(data);
			}
			defaults.success(data);
		}
	}
}