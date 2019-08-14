<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>bookList</title>
	<style type="text/css">
		table {
			/* border: 1px solid #ccc; */
			/* background-color: skyblue; */
			border-collapse: collapse;
		}
		th,
		td {
			border: 1px solid red;
		}
	</style>
</head>
<body>
	<?php  
	//数据是假数据，真正的场景中数据基本上都是来自数据库
	$arr = array();
	$arr[0] = array('name'=>'三国演义','author'=>'施耐庵','category'=>'古典文学','desc'=>'这是一段描述');
	$arr[1] = array('name'=>'水浒传','author'=>'罗贯中','category'=>'古典文学','desc'=>'这是一段描述');
	$arr[2] = array('name'=>'红楼梦','author'=>'曹雪芹','category'=>'古典文学','desc'=>'这是一段描述');
	$arr[3] = array('name'=>'西游记','author'=>'吴承恩','category'=>'古典文学','desc'=>'这是一段描述');

	?>
	<table>
		<thead>
			<tr>
				<th>名称</th>
				<th>作者</th>
				<th>分类</th>
				<th>描述</th>
			</tr>
		</thead>
		<tbody>
			<?php foreach ($arr as $value) {?>
				<tr>
					<td><?php echo $value['name']; ?></td>
					<td><?php echo $value['author']; ?></td>
					<td><?php echo $value['category']; ?></td>
					<td><?php echo $value['desc']; ?></td>
				</tr>
			<?php } ?>
		</tbody>
	</table>
</body>
</html>