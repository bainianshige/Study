# ES6

## webpack-ES6 的处理

+ ES6 的模块，vue本身默认支持ES6的模板导入导出
+ babel
  + babel-loader(内部依赖babel-core)
    + 语法(`presets`:  `@babel/preset-env`)
    + 插件(`plufins`: `'@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'`)

### ES6 中的模块

+ 默认
  + 导出：`export default obj`
  + 导入： `import xxx from './xxx'`
+ 声明式
  + 导出：`export var obj = xxx`, `export var obj2 = {}`
  + 单独导出：`export {stu}`
  + 导入：`import {obj, obj2, stu} from './xxx.js'` 直接使用obj
+ 全体
+ 默认导入和声明式导入在使用上的区别
  + 注意：声明式导入的时候，必须{名称} 名称要一直 (按需导入)
  + 默认导入，可以任意使用变量名

```javascript
{
    default: "默认导出的结果"		// import xxx from './cal.js'会获取到整个对象的 default 属性
    obj1: "声明式导出1"			 // import {obj1, obj2} 获取指定名称的属性
    obj2: "声明式导出2"			 // import * as allObj from './cal.js' 获取的就是一整个对象
}
```

+ import 和 export 一定要写在顶级，不能包含在别的作用域内 {}

### ES6中的代码变化

+ 对象属性的声明

  ```javascript
  var name = 'abc'
  var person = {name}  // 简写 -> var person = {name:name}
  ```

+ 函数声明

  ```javascript
  var cal = {
      add: function () {
          return 1
      }
      add2 () {
          return 2
      }
  	add3: function (n1, n2) {
          return n1 + n2
      }
  	add4(n1, n2)  {       // 丢弃了 function
          return n1 + n2
      }
  }
  ```

+ 当属性的 key 和变量的名相同，要使用变量的值做 value， 就可以简写 {name}

