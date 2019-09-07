<?php 

	$usn = $_POST['username'];
	$paw = $_POST['password'];

	if ($usn == 'admin' && $paw == '123') {
		echo "1";
	} else {
		echo "2";
	}
 ?>