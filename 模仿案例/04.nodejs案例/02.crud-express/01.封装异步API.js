function fn(callback) {
  // var callback = function (data) { console.log(data) }
  setTimeout (function () {
    var data = 'hello'
    callback(data)
  }, 1000)
}

// 调用 fn，得到内部的 data

// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数获取

// 回调函数：获取异步操作的结果

fn(function (data) {
  console.log(data)
})

/*
$.get('xxx', function (data) {

})

$.ajax({
  url: 'xxx'
  type: 'get'
  data: {
    foo: 'bar'
  },
  // 使用者只负责传递，封装者需要去调用
  success: function () {

  }
})


function ajax(options) {
  options.success(data)
}
*/
