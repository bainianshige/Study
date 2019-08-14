	//获取元素
		var box = my$('box');
		var screen = box.children[0];
		var ul = screen.children[0];
		var ol = screen.children[1];

		//箭头 arrow
		var arr = my$('arr'); 
		var arrLeft = my$('left');
		var arrRight = my$('right');

		//图片的宽度
		var imgWidth = screen.offsetWidth;

		//1.动态生成序号
		//1.1先把页面上共有多少张图片   没有克隆的li
		var count = ul.children.length;
		for (var i = 0; i < count; i++) {
			var li = document.createElement('li');
			ol.appendChild(li);
			setInnerText(li, i + 1);
			// 让第一个序号高亮显示
			if (i === 0) {
				li.className = 'current';
			}

			//2.点击序号 动画的方式 切换图片
			li.onclick = liClick;

			//让当前的li记录他的索引
			//设置标签的自定义属性
			li.setAttribute('index', i)
		}
		function liClick() {
			//2.1取消其他li的高亮显示，让当前li高亮显示
			for (var i = 0; i < ol.children.length; i++) {
				var li = ol.children[i];
				li.className = '';
			}
			//让当前li高亮显示
			this.className = 'current';
			//2.2点击序号，动画的方式切换到当前点击的位置
			
			//获取自定义属性
			var liIndex = parseInt(this.getAttribute('index'));
			animate(ul, -liIndex * imgWidth);

			//全局变量index 和 li中的index保持一致
			index = liIndex;
		}
		// 让第一个序号高亮显示
		// ol.children[0].className = 'current';

		
		//3.鼠标放到盒子上显示箭头
		box.onmouseenter = function () {
			arr.style.display ='block';
			//清除定时器
			clearInterval(timerId);
		}

		box.onmouseleave = function () {
			arr.style.display ='none';
			//重新开启定时器
			timerId = setInterval(function () {
				arrRight.click();
			}, 2000);
		}

		//4.实现上一张和下一张的功能
		//下一张
		//定义一个全局变量 第一个照片的索引
		var index = 0;
		arrRight.onclick = function () {
			//判断是否是克隆的第一张图片，如果是克隆的第一张图片，此时修改ul的坐标，显示真正的第一张图片
			if (index === count) {
				ul.style.left = '0px';
				index = 0;
			}

			//如果是最后一张图片，不让index++

			//总共有5张图片，但是还有一张克隆的图片  克隆的图片的索引是5
			//4 < 5

			index++;
			if (index < count) {
				// animate(ul, -index * imgWidth);
				//获取图片对应的序号，让序号点击

				ol.children[index].click();
			} else {
				//如果是最后一张图片，以动画的方式，移动到克隆的第一张图片
				animate(ul, -index * imgWidth);
				//取消所有序号的高亮显示，让第一序号高亮显示
				for (var i = 0; i < ol.children.length; i++) {
					var li = ol.children[i];
					li.className = '';
				}
				ol.children[0].className = 'current';
			}
		}

		//无缝滚动
		//获取ul中的第一个li
		var firstLi = ul.children[0];
		//克隆li
		var cloneLi = firstLi.cloneNode(true);
		ul.appendChild(cloneLi);

		//上一张
		arrLeft.onclick = function () {
			//如果当前是第一张图片，此时要偷偷地切换到最后一张图片的位置（克隆的第一张图片）
			if (index === 0) {
				index = count;
				ul.style.left = -index * imgWidth + 'px';
			}

			index--;

			ol.children[index].click();
			// if (index > 0) {
			// 	index--;
			// 	// animate(ul, -index * imgWidth);
			// 	ol.children[index].click();
			// }
		}


		//5.自动切换图片
		timerId = setInterval(function () {
			arrRight.click();
		},2000);