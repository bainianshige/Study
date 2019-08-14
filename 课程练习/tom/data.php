<?php 

	$arr = array("username"=>"zhangsan","age"=>"12");

	$cb = $_GET['callback'];
	echo $cb.'('. json_encode($arr) .')';

 ?>