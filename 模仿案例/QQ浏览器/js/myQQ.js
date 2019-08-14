$(function () {
	setTimeout(function () {
		$('.section1').addClass('comein');
	}, 200);
    $('#fullpage').fullpage({
    	//显示项目符号
        navigation: true,
        //循环滚动
        loopBottom: true,
        onLeave: function (index, nextIndex, direction) {
        	if (nextIndex != 1) {
        		//如果不是第一屏幕，就给背景添加旋转的类名 因为是逆时针旋转所以是 -60deg
        		$('#bg').addClass('rotate');
        	} else {
        		$('#bg').removeClass('rotate');
        	}

        	//第二屏幕的制作
        	//当我们进入第二屏幕的时候让图片的z轴变为零
        	if (nextIndex == 2) {
        		//jQuery里面的 animate 是不支持 transform 等
        		//但是jQuery里面通过 css 和 transition 搭配也能基本实现 类似animate 效果
        		$('.p2').css('transform','translateX(-50%) translateY(-50%) translateZ(0) scale(1)');
        	} else {
        		$('.p2').css('transform','translateX(-50%) translateY(-50%) translateZ(2000px) scale(1)');
        	}

        	//第三屏幕的制作
        	//当我们进入第三屏幕的时候让盒子进入屏幕
        	if (nextIndex == 3) {
        		$('.p3').css('transform','translateZ(-50px) rotateX(30deg)');
        		$('.title3').css('transform','translateZ(0) rotateY(0)');
        	}

        	if (nextIndex == 4) {
        		$('.p3').css('transform','translateZ(-200px) rotateX(-45deg) translateX(3000px)');
        		$('.title3').css('transform','translateZ(1200px) rotateY(-60deg)');
        	}

        	//第四屏幕
        }

    });
});