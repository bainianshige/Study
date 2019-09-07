# Vue

## Vue 单文件方式

+ 单文件就是以 *.vue 结尾的文件，最终通过 webpack 也会编译成 *.js 在浏览器运行
+ 内容: <trmplate></template> + <script></script> + <style></style>
  + template 中只能有一个根节点
  + script 按照 export default {配置} 来写
  + style 中 可以设置 scoped 属性，让其只在 template 中生效

##  以单文件的方式启动

+ webpack 安装插件编译单文件代码

  + vue-loader,  vue-template-compiler,  代码中依赖 vue

  + 安装

  + ```shell
    cnpm install -S vue
    ```

  + ```shell
    cnpm install -D vue-loader vue-template-compiler
    ```

+ 配置

```javascript
// 引入文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 配置 webpack.config.js 中的 module 来处理编译 vue 文件
module: {
    rules: [
        { test: /\.vue$/, use: 'vue-loader' }
    ]
}

// 在插件节点配置
plugins: [
    new VueLoaderPlugin()
]
```

## Vue 介绍

+ 核心概念：       组件化    双向数据流（基于ES5中的defineProperty来实现的），IE9才支持
+ angular核心：  模块化   双向数据绑定（基于脏检测：一个数组（$watch））
  + 开发一个登陆模块，登陆需要显示的头部、底部、中部
  + 组件：组合起来的一个部件（头部、底部、中部）
  + __细分代码__
    + 头部：页面、样式、动态效果
    + 代码：template   style  script

+ [对比其他框架优缺点](https://cn.vuejs.org/v2/guide/comparison.html)

### 数据流

+ js 内存属性发生改变，影响页面的变化
+ 页面的改变影响 js 内存属性的改变

### Vue 中常用指令 v- 指令


+ v-text       是元素的 innerText 只能在双标签中使用
+ v-html      是元素的 innerHTML，不能包含{{xxx}}
+ v-if            元素是否移除或者插入
+ v-show     元素是否显示或者隐藏
+ v-model    双向数据绑定
+ v-bind       单项数据绑定（内存 js 改变影响 bind 页面，bind 改变不会影响到数据的绑定）
+ v-for          遍历对象

### class 结合 v-bind 使用

+ 需要根据可变的表达式的结果给 class 赋值时，就需要用到 v-bind:class='xxx'
+ v-bind:属性名="表达式",最终表达式运算结束的结果赋值给该属性名
  + 简化的写法是`:属性名="表达式"`
+ class:结果的分类
  + 一个样式：返回字符串(三元表达式和Key和样式的清单对象)
  + 多个样式：返回对象(样式做Key，true 或 false做值)

### methods 和 v-on 的使用

+ 绑定事件的方法
  + `v-on:事件名="表达式||函数名"` 
  + 简介：`@事件名="表达式||函数名"`
+ 函数名如果没有参数，可以省略()  只给一个函数名称
+ 声明组件内函数，在 export default  这个对象的根属性加上 methods 属性，是一个对象
  + key 是函数名  value 是函数体
+  export default  这个对象的根属性中的 data 属性，是一个函数，返回一个对象
  + 对象的属性是初始化的变量名称
+ 凡是在 template 中使用变量或者函数，不需要加 this ，在 script 中使用就需要加上 this

### v-foe 的使用

+ 可以使用操作数组(item, index)  ||  也可以使用操作对象(value, key, index)

+ key 是类似于 trank by 的一个属性，为的是告诉 Vue script 中的元素，与页面之间的关联
+ 当试图删除元素的时候，是单个元素的删除而不是整版的替换，所以需要关联其关系
  + 必须设置

### 父子组件的使用

+ 父和子，调用者是父，被调用者是子
+ 父需要声明子组件，引入子组件对象，声明方式

```javascript
<script>
import 子组件对象 from 子组件的文件路径

export default {
    components: {
        子组件名称： 子组件对象,   // 是对象的形式 key：value
        子组件名称,    		  // 简写形式
    }
}
</script>
```

+ 全局组件，使用更为方便，不需要声明，直接使用
+ 在 main.js 引用一次后使用 `vue.component('组件名',组件对象)`

+ 所有的组件就可以直接通过组件名，使用

### 父组件和子组建的传值

#### 父组件传值给子组件

+ 父组件通过子组件的属性将值进行传递
  + 方式
    + 常量: `prop1='常量值'`
    + 变量:`:prop2='变量名'`
+ 子组件需要声明
  + 根属性 props:['prop1','prop2']
  + 在页面中直接使用{{ prop1 }}
  + 在 script 中可以通过 this.prop1 来

#### 子组件传值给父组件

+ 父组件通过 new Vue() 这样的一个对象，来 $on('事件名', callback(prop1, prop2))
+ 子组件引入同一个 vuebus，来 $emit('跟父组件相同的事件名','prop1,prop2')

### 过滤器

+ content | 过滤器, vue 中没提供相关的内置过滤器，可以自定义过滤器
+ 组件内的过滤器 + 全局过滤器
  + 组件内过滤器就是 options 中的一个 filters 的属性（一个对象）
    + 多个 key 就是不同过滤器名，多个 value 就是与 key 对应的过滤方式函数体
  + Vue.filter(名:fn)

## 其他

### 文档 API 的分类查看

+ 全局 API一般用 `Vue.` 调用
+ 实例对象 API一般用 `new Vue. || this.  ` 调用
+ 选项(options) API 一般用 `new Vue()的参数   ||  export default里面的属性` 调用

### Vue单文件方式启动总结

+ 准备好配置文件 package.json(包描述文件 && 封装命令 npm run dev) + webpack.config.js 文件(打包的配置文件)
+ 创建 index.html (单页应用的页)
+ 创建 main.js (入口文件)
+ 引入 vue 和相关的文件 xxx.vue
+ new Vue(options)
+ options(选项)
  + data
  + methods
  + components   (组件内声明子组件)
  + props
+ 实例
  + 在组件内 (xxx.vue) 中的 this
  + new Vue()
  + 事件
    + this.$on(事件名，回调函数(参数))
    + this.$emit(事件名，数据)
    + this.$once(事件名，回调函数(参数)) 只触发一次
    + this.$off(事件名)  取消事件
+ 全局
  + Vue.component('组件名'，组件对象)   在哪里都可以使用
+ 组件传参
  + 父传子：属性作为参数
    + 常量: `prop1='常量值'`   子组件声明接收参数 props:['xxx']
    + 变量:`:prop2='变量名'`  子组件声明接收参数 props:['xxx']
  + 子传父
    + 父组件通过 new Vue() 这样的一个对象，来 $on('事件名', callback(prop1, prop2))
    + 子组件引入同一个 vuebus，来 $emit('跟父组件相同的事件名','prop1,prop2')