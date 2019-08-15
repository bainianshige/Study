window.onload = function () {
	searchEffect();
	timeBack();
	bannerEffect();
}



// 头部的js效果
function searchEffect () {
	// 头部搜索块的js效果
	// 1.获取当前banner的高度
	var banner = document.querySelector(".jd_banner");
	var bannerHeight = banner.offsetHeight;
	// 获取header搜索块
	var search = document.querySelector('.jd_search');
	// console.log(bannerHeight);
	// 2.获取当前屏幕滚动时，banner滚动出屏幕的距离
	window.onscroll = function () {
		var offsetTop = document.documentElement.scrollTop;
		// 3.计算一个比例值，获取透明度，设置背景颜色的样式
		// 判断，如果当我们banner还没有完全滚出屏幕，才有必要计算透明度和设置透明度
		if (offsetTop < bannerHeight) {
			var opacity = offsetTop/bannerHeight;
			//设置样式
			search.style.backgroundColor = 'rgba(233, 35, 34, '+ opacity +')';
		} 
	}
} 

//倒计时效果
function timeBack() {
	// 1.获取用于展示事件的span
	var spans = document.querySelector('.jd_sk_time').querySelectorAll('span');
	// 2.设置初始的倒计时时间
	var totalTime = 3700;
	// 3.开启定时器
	var timerId = setInterval(function() {
		totalTime--;
		// 判断倒计时时间是否已经完成
		if (totalTime < 0) {
			// 清除时钟
			clearInterval(timerId);
			return;
		} else {
			// 得到剩余时间中的  时  分  秒
			var hour = Math.floor(totalTime / 3600);
			var minute = Math.floor(totalTime % 3600 / 60);
			var second = Math.floor(totalTime % 60);
			// 赋值，将时间填充到spans中
			spans[0].innerHTML = Math.floor(hour/10);
			spans[1].innerHTML = Math.floor(hour%10);
			spans[3].innerHTML = Math.floor(minute/10);
			spans[4].innerHTML = Math.floor(minute%10);
			spans[6].innerHTML = Math.floor(second/10);
			spans[7].innerHTML = Math.floor(second%10);
		}
	}, 1000)
}

// 轮播图
function bannerEffect() {
	// 1.设置修改轮播图的页面结构
	// a. 在开始位置添加原始的最后一张图片
	// b. 在结束的位置添加原始的第一张图片
	// 1.1 获取轮播图结构
	var banner = document.querySelector('.jd_banner');
	// 1.2 获取图片容器
	var imgBox = document.querySelector('.jd_bannerImg');
	// 1.3 获取原始和结束的图片
	var first = imgBox.querySelector('li:first-child');
	var last = imgBox.querySelector('li:last-child');
	// 1.4 在首尾插入两张图片  cloneNode:复制一个dom元素
	imgBox.appendChild(first.cloneNode(true));
	// insertBefore(需要插入的dom元素， 位置)
	imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

	// 2.设置对应的样式
	// 2.1 获取所有的li元素
	var lis = imgBox.querySelectorAll('li');
	// 2.2 获取li元素的数量
	var count = lis.length;
	// 2.3 获取banner的宽度
	var bannerWidth = banner.offsetWidth;
	// 2.4 设置图片盒子的宽度
	imgBox.style.width = bannerWidth * count + "px";
	// 2.5 设置每一个li元素的宽度
	for (var i = 1; i < lis.length; i++) {
		lis[i].style.width = bannerWidth +  "px";
	}

	// 定义图片的索引:图片已经有了一个宽度的默认偏移
	var index = 1;

	// 3.设置默认的偏移
	imgBox.style.left = - bannerWidth + "px";

	// 4.当屏幕变化的时候，重新计算宽度
	window.onresize  = function () {
		// 4.1 获取banner的宽度,并且覆盖全局的宽度值
		bannerWidth = banner.offsetWidth;
		// 4.2 设置图片盒子的宽度
		imgBox.style.width = bannerWidth * count + "px";
		// 4.3 设置每一个li元素的宽度
		for (var i = 1; i < lis.length; i++) {
			lis[i].style.width = bannerWidth +  "px";
		}

		// 4.4设置默认的偏移
		imgBox.style.left = - bannerWidth * index + "px";

	}

	// 5.实现自动播放
	setInterval(function () {
		// 5.1 变化索引
		index++;
		// 5.2 添加过渡效果
		imgBox.style.transition = "left 0.5s ease-in-out"
		// 5.3设置默认的偏移
		imgBox.style.left = (-index * bannerWidth) + "px";
		// 5.4 判断是否到最后一张
		setTimeout(function () {
			if (index == count-1) {
				console.log(index);
			index = 1;
			// 如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果
			// 关闭过渡效果
			imgBox.style.transition = 'none';
			// 偏移到制定的位置
			imgBox.style.left = (-index * bannerWidth) + "px";
		}
		}, 500)
	}, 2000)

}

