window.onload = function () {
	// 获取左侧栏
	var ct_cLeft = document.querySelector('.ct_cLeft');
	// 获取左侧栏的高度
	var leftHeight = ct_cLeft.offsetHeight;
	// 获取用来滑动的列表
	var ulBox = ct_cLeft.querySelector('ul:first-of-type');
	var ulBoxHright = ulBox.offsetHeight;
	// console.log(leftHeight);
	// console.log(ulBoxHright);

	// 获取所有的li元素
	var lis = ulBox.querySelectorAll('li');

	// 设置静止状态下的最大的top值
	var maxTop = 0;
	// 设置静止状态下的最小top值
	var minTop = leftHeight - ulBoxHright;

	// 设置滑动状态下的最大的top值
	var maxBounceTop = maxTop + 100;
	// 设置滑动状态下的最小的top值
	var minBounceTop = minTop - 100;


	// 实现滑动
	// 定义全局变量
	var startY = 0;
	var moveY = 0;
	var distanceY = 0;
	// 记录当前元素滑动到的距离
	var currentY = 0


	// 添加滑动事件
	// 滑动开始事件
	ulBox.addEventListener('touchstart', function (e) {
		// 获取手指的起始坐标
		// console.log(e);
		startY = e.targetTouches[0].clientY;
		// console.log(startY);
	});
	ulBox.addEventListener('touchmove', function (e) {
		moveY = e.targetTouches[0].clientY;
		// console.log(moveY);
		// 计算坐标差值
		distanceY = moveY - startY;
		// console.log(distanceY);
		// 判断滑动的时候是否超出当前指定的滑动区间
		if (distanceY + currentY > maxBounceTop || distanceY + currentY < minBounceTop) {
			// console.log('到底了');
			return false;
		} 
		// 将可能存在的过渡样式效果清除
		ulBox.style.transition = 'none';
		// 实现偏移操作:应该在之前的滑动距离基础之上再进行滑动
		ulBox.style.top = (distanceY + currentY) + 'px';
	});
	ulBox.addEventListener('touchend', function (e) {
		// 判断当前滑动的距离是否在静止状态和滑动状态的最小top区间
		if (currentY + distanceY < minTop) {
			// 回到mintop位置,开启过渡
			ulBox.style.transition = 'top 0.5s';
			ulBox.style.top = minTop + 'px';
			currentY = minTop;

		} else if (currentY + distanceY > maxTop) {
			// 回到mintop位置,开启过渡
			ulBox.style.transition = 'top 0.5s';
			ulBox.style.top = maxTop + 'px';
			currentY = maxTop;
		} else {
			// 记录当前滑动的距离
			currentY += distanceY;
			// console.log('----------' + currentY);
		}
	})

	// 为每一个li元素设置添加一个索引值
	for (var i = 0; i < lis.length; i++) {
		// lis[i].setAttribute('index', i);
		// 给对象加属性,可以用.index / .flag等等
		lis[i].index = i;
	}

	// 绑定移动端的tap事件
		// itcast.tap(ulBox, function (e) {
		// 	// 1.修改li元素的样式,将所有li元素的active样式清楚，再为当前点击的li元素添加active样式
		// 	for (var i = 0; i < lis.length; i++) {
		// 		lis[i].classList.remove('active');
		// 	}
		// 	// 为当前被点击的li元素添加样式
		// 	var li = e.target.parentNode;
		// 	var liHeight = li.offsetHeight;
		// 	li.classList.add('active');
		// 	// 2.移动当前的li元素到父容器的最顶端，但是不能超出之前设定的静止状态下的最小的top
		// 	// 获取当前li元素的索引值
		// 	var index = li.index;
		// 	// 开启过渡
		// 	ulBox.style.transition = 'top, 0.5s';
		// 	// 设置偏移
		// 	if (-index * liHeight < minTop) {
		// 		// 只能偏移到minTop位置
		// 		ulBox.style.top = minTop + 'px';
		// 		currentY = minTop;
		// 	} else {
		// 		ulBox.style.top = -index * liHeight + 'px';
		// 		currentY = -index * liHeight;
		// 	}
		// });

	// $(ulBox).on('tap', function (e) {
	// 	// 1.修改li元素的样式,将所有li元素的active样式清楚，再为当前点击的li元素添加active样式
	// 	for (var i = 0; i < lis.length; i++) {
	// 		lis[i].classList.remove('active');
	// 	}
	// 	// 为当前被点击的li元素添加样式
	// 	var li = e.target.parentNode;
	// 	var liHeight = li.offsetHeight;
	// 	li.classList.add('active');
	// 	// 2.移动当前的li元素到父容器的最顶端，但是不能超出之前设定的静止状态下的最小的top
	// 	// 获取当前li元素的索引值
	// 	var index = li.index;
	// 	// 开启过渡
	// 	ulBox.style.transition = 'top, 0.5s';
	// 	// 设置偏移
	// 	if (-index * liHeight < minTop) {
	// 		// 只能偏移到minTop位置
	// 		ulBox.style.top = minTop + 'px';
	// 		currentY = minTop;
	// 	} else {
	// 		ulBox.style.top = -index * liHeight + 'px';
	// 		currentY = -index * liHeight;
	// 	}
	// });

	// fastclick使用的时候就是用来绑定添加click事件
	// 绑定fastclick
	if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            //参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*!/
            FastClick.attach(document.body);
        }, false);
    }
	ulBox.addEventListener('click', function (e) {
		// 1.修改li元素的样式,将所有li元素的active样式清楚，再为当前点击的li元素添加active样式
		for (var i = 0; i < lis.length; i++) {
			lis[i].classList.remove('active');
		}
		// 为当前被点击的li元素添加样式
		var li = e.target.parentNode;
		var liHeight = li.offsetHeight;
		li.classList.add('active');
		// 2.移动当前的li元素到父容器的最顶端，但是不能超出之前设定的静止状态下的最小的top
		// 获取当前li元素的索引值
		var index = li.index;
		// 开启过渡
		ulBox.style.transition = 'top, 0.5s';
		// 设置偏移
		if (-index * liHeight < minTop) {
			// 只能偏移到minTop位置
			ulBox.style.top = minTop + 'px';
			currentY = minTop;
		} else {
			ulBox.style.top = -index * liHeight + 'px';
			currentY = -index * liHeight;
		}
	})
}