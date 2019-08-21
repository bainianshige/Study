<?php 
	
	//后台接口
	// echo 1;
	// echo "Welcome to this";
	// header('Content-Type:text/plain; charset = utf-8');
	// echo "<div><span>测试数据</span><span>测试数据</span><span>测试数据</span><span>测试数据</span><span>测试数据</span></div>";
	

	//json_encode() 把数组或者对象转换成字符串
	

	// $arr = array('username'=>'张三','age'=>'12','sex'=>'男');

	$arr = array();
	$arr['123'] = array('username'=>'张三','score'=>'100');
	$arr['456'] = array('username'=>'李四','score'=>'90');
	$arr['789'] = array('username'=>'王五','score'=>'150');

	echo json_encode($arr);
	//\u5f20\u4e09  这种形式是Unicode编码
	//{"username":"\u5f20\u4e09","age":"12","sex":"\u7537"}


 ?>