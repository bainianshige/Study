// ES6 写法
import $ from 'jquery'

import cal from './js/cal.js'

// $(function () {
//   $('#btn').click(function() {
//     alert('成功！！！')
//   })
// })

// 引入 cal 对象
var cal1 = require('./js/cal.js')

// 获取按钮
document.getElementById('btn').onclick = function () {
  var n1 = document.getElementById('n1').value - 0;
  var n2 = document.getElementById('n2').value - 0;
  var sum = cal.add(n1, n2)
  document.getElementById('result').value = sum
}

