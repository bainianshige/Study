$(function () {
	// 初始化工具提示
	$('[data-toggle="tooltip"]').tooltip();
	// 获取当前所有item
	var items = $('.carousel-inner .item');
	// console.log(items);
	// 监听屏幕的大小改变
	$(window).on('resize', function () {
		// 1.获取当前屏幕的宽度
		var width = $(window).width();
		// 2.判断屏幕的宽度
		if (width >= 768) {  /*非移动端*/
			// 为每一个item添加子元素
			$(items).each(function (index, value) {
				var item = $(this);
				// 获取当前自定义属性中，存储的图片路径
				var imgSrc = item.data("largeImage");
				// console.log(imgSrc);
				// 添加非移动端的子元素
				item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage","url("+ imgSrc +")"));
			});
		} else {
			$(items).each(function (index, value) {
				var item = $(this);
				var imgSrc = item.data("smallImage");
				// 添加非移动端的子元素
				item.html('<a href="javascript:;" class="mobileImg"><img src='+ imgSrc +'></a>');
			});
		}
	}).trigger("resize");

	/*添加移动端的滑动操作*/
	var startX, endX;
	var carousel_inner = $('.carousel-inner')[0];

	/*获取当前轮播图*/
	var carousel = $('.carousel');

	carousel_inner.addEventListener('touchstart', function (e) {
		startX = e.targetTouches[0].clientX;
	})
	carousel_inner.addEventListener('touchend', function (e) {
		endX = e.changedTouches[0].clientX;
		if (endX - startX > 0) {
			/*上一张*/
			carousel.carousel('prev');
		} else if (endX - startX < 0) {
			/*下一张*/
			carousel.carousel('next');
		}
	})


	/*计算产品块导航项的原始的宽度*/
	var ul = $('.wjs_product .nav-tabs');
	// 拿到所有li元素
	var lis = ul.find('li');
	/*定义一个总宽度*/
	var totalWidth = 0;
	lis.each(function (index, value) {
		totalWidth += $(value).innerWidth();
		// console.log(totalWidth);
		// 获取宽度的方法的说明
		// *width();只能得到当前元素的内容的宽度
		// innerWidth();能获取到当前元素的内容的宽度+padding
		// outWidth();能获取到当前元素的内容的宽度+padding+border
		// outWidth(true);能获取到当前元素的内容的宽度+padding+border+margin
	});
	ul.width(totalWidth);

	// 使用插件来实现导航条的操作
	var myScroll = new IScroll('.tabs_parent', {
		// 设置水平滑动,同时不允许垂直滑动
		scrollX: true, scrollY: false
	});
});

