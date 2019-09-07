var cal = {
  add: function (n1, n2) {
    return n1 + n2
  }
}

// commomjs 导出
// module.exports = cal

// ES6 默认导出
export default cal
// 默认导入
// import xxx from './xxx'

/* 声明式导出
export var obj1 = '我是声明式导出1'
export var obj2 = '我是声明式导出2'
export var obj3 = '我是声明式导出3'

// 导入方式
import {onj1, obj2} from './cal.js'
*/

/* 另一种方式声明导出
var obj4 = '我是声明式导出4'
export {obj4}
// 导入方式
import {obj1, obj2, obj4} from './cal.js'
*/

