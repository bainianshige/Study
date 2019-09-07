<?php 
	
	$code = $_POST['code'];

	$books = array();
	$books['三国演义'] = array('bookname'=>'三国演义','author'=>'罗贯中','desc'=>'这是一段描述'); 
	$books['水浒传'] = array('bookname'=>'水浒传','author'=>'施耐庵','desc'=>'这是一段描述'); 

	//array_key_exists($code, $books)  用来判断数组中有没有对应的键
	if (array_key_exists($code, $books) == 1) {
		$book = $books[$code];//这里根据参数获取一本书的信息
		echo json_encode($book);
	} else {
		echo '{"flag":0}';
	}
 ?>