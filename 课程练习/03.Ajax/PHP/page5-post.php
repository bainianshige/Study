<?php 
	//这里根据表单中的name属性获取值(普通方法)
		// $uname = $_POST['userName'];
		// $password = $_POST['passWord'];

		// if ($uname == 'admin' && $password == '123') {
		// 	echo "登录成功";
		// } else {
		// 	echo "用户名或密码错误";
		// }

	
	//iframe方法，局部更新
	$username = $_POST['userName'];
	$password = $_POST['passWord'];

	// if ($username == 'admin' && $password == '123') {
	// 	echo "这是一句话";
	// }


	if ($username == 'admin' && $password == '123') {
 ?>		
	<script type="text/javascript">
		parent.document.getElementById('info').innerHTML = '登录成功';
	</script>
<?php 		
	} else {
 ?>		
	<script type="text/javascript">
		parent.document.getElementById('info').innerHTML = '账号或密码错误';
	</script>
<?php 		
	}
 ?>