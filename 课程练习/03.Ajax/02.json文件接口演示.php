<?php 

	// echo '{"username":"zhangsan","age":"12"}';
	//------------------------------------------------
	// $uname = 'lisi';
	// $age = 13;
	//echo '{"username":"'.$uname.'","age":"'.$age.'"}';
	//------------------------------------------------
	// json_encode(); //作用就是把数组转化成json形式的字符串
	// $arr = array(1, 2, 3);
	$arr = array("name1"=>"tom", "name2"=>"jerry", "name3"=>"spike");
	$str = json_encode($arr);

	echo $str;
 ?>