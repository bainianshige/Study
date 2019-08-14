<?php 
	
	$cb = $_GET['cb'];
	$arr = array("username"=>"zhangsan","age"=>"12");
	echo $cb.'('. json_encode($arr) .')';

	// echo "123";

 ?>