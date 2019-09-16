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

```shell
cnpm install -S vue
```

 ```shell
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

### 为组件样式设置作用域

+ **对于应用来说，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。**

+ 实例

  ```vue
  <template>
    <button class="button button-close">X</button>
  </template>
  
  <!-- 使用 `scoped` 特性 -->
  <style scoped>
  .button {
    border: none;
    border-radius: 2px;
  }
  
  .button-close {
    background-color: red;
  }
  </style>
  ```

  

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
+ 全局定义：范围大，组件名称相同时权力小会被覆盖
+ 组件内定义：范围小，组件名称相同时权力大会覆盖全局定义

### 获取 DOM 元素

+ 在指定元素上，添加 ref='名称A'
+ 在获取的地方加上 this.$refs.名称A
  + 如果 ref 放在了原声 DOM 元素上，获取的数据就是原生的 DOM 对象
    + 可以直接操作
  + 如果 ref 放在了组件对象上，获取的就是组件对象
    + 获取到 DOM 对象，通过 `this.$refs.名称.$el`  获取来操作
  + 生命周期函数 => 事件
    + created      数据已经完成初 M 还未生成，无法操作
    + mounted   数据已经装载到 DOM 上，并且将数据渲染到 DOM 中，DOM 已经生成

### use 实际操作

+ 组件库，在内部注册各种全局组件
+ 插件，挂载属性，为了方便 this. 可以使用到插件的功能

## mint-ui

- element-ui  在 pc 端使用的 饿了吗公司做的

- mint-ui 是 element-ui 的移动版本

- [mint-ui 官网](https://mint-ui.github.io/#!/zh-cn)

- 安装

  ```javascript
  npm install -S 
  ```

- 引入全部组件

  ```javascript
  // 引入 mint-ui
  import Mint from 'mint-ui'
  // 安装插件
  Vue.use(Mint)
  ```

- 按需引入部分组件

  ```javascript
  import { Cell, Checklist } from 'mint-ui'
  Vue.component(Cell.name, Cell)
  Vue.component(Checklist.name, Checklist)
  ```

+ 注意
  + 如果是全部安装的方式，在 tempalate 中可以直接使用组件标签
  + 如果需要在 script 中单独配置，就需要在 script 中按需引入组件对象

## vue-router 路由

### [官网 API](https://router.vuejs.org/zh/)

### 基本使用

+ 前端路由  **核心就是锚点值的改变，根据不同的值，渲染指定 DOM 位置的不同数据**

+ 模板数据是通过调用函数获取的

+ 核心：锚点值改变

+ vue 开头，就必须 Vue.use

+ vue 核心插件

  + vue-router   处理路由
  + vuex	  管理全局共享数据

+ 使用方式

  + 安装

    +  `npm i vue-router -S`

  + 在 main.js 中引入

    + `import VueRouter from 'vue-router'`
  + `import Music from './component/music.vue'`
  
  + 安装插件
  
    +  `Vue.use(VueRouter) `
  
  + 创建路由对象并配置路由规则
  
    + ```javascript
      // 创建路由对象并配置路由规则
      let router = new VueRouter({
        // key routes 是固定的
        routes: [
          // 一个个对象
        	{ name:'music', path:'/music', component: Music }
        ]
  })
      ```
  
  + 将路由对象传递给 Vue 实例，options 中
  
    + ```javascript
      new Vue({
          el: '#app',  	    // 需要渲染的对象
          router: router,     // 挂载路由
          render: c => c(App) // 渲染的内容
      })
      ```
  
  
  + 在`app.vue`中留坑 
  
    + ```javascript
      <template>
          <div>
          	<router-view></router-view>
          </div>
      </template>
      ```
  

###  命名路由

+ 通过 `router-link` 标签的点击，做页面数据的跳转

  + ```javascript
    <router-link :to="{ name:'music' }">进入音乐</router-link>
    // 也可以在 to 后面跟路径来使用(只做了解，后期不好维护)
  <router-link to="/movie">进入音乐</router-link>
    ```

+ 使用 `router-link` 标签
  + 去哪里 `<router-link to="/beijing">去北京</router-link>`
  + 去哪里 `<router-link :to="{ name:'beijing' }">去北京</router-link>`
    + 更利于维护，如果要修改 path，只需要需改路由配置中的 path，标签会自动修改

### router-link 传参

+ 在 vue-router 中，有两大对象被挂载到了 this 实例中
+ $route(只读、具备信息的对象)、 $router(具备功能函数)
+ 查询字符串的方法(类似 get 传参)
  + 1.跳转配置
  +  `<router-link :to{ name: 'detail', query:{id: index} }></router-link>`
  + 2.更改路由配置(查询字符串的方式不用改 path)
  + `{ name: 'detail', path: '/detail', component: Detail }`
  + 3.获取路由参数
  + `this.$route.query.id`
+ path 方法(类似 post 传参)
  - 1.跳转配置
  -  `<router-link :to{ name: 'detail', params:{id: index} }></router-link>`
  - 2.更改路由配置(params 需要在路由上加上/:id)
  - `{ name: 'detail', path: '/detail/:id', component: Detail }`
  - 3.获取路由参数
  - `this.$route.params.id`

### 编程导航

+ 不能保证用户一定会点击某些按钮
+ 并且当前操作，除了路由跳转之外，还有一些附加操作
+ this.$router.go  根据浏览器记录  前进(1)   后退(-1)
+ this.$router.push(直接跳转到某一个页面显示)
  + push 参数：字符串/xxx
  + 对象：`{name: 'xxx', query: { id: id }}`

### 路由的原生实现

+ 基于 `window.addEventListener('hashchange', 'fn')`
+ 根据留坑 `<router-view></router-view>`, 作为一个 DOM 上的标识
+ 最终当锚点值改变触发 `hashchange` 的回调函数，将指定的模板插入 DOM 标识

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>路由的原生实现</title>
</head>
<body>
  <div>头部</div>
  <div id="content"></div>
  <div>底部</div>

  <script type="text/javascript">
    // 监视锚点值的改变
    window.addEventListener('hashchange', function () {
      var text = ''
      switch(location.hash) {
        case '#/music': text = '音乐的数据'; break
        case '#/movie': text = '电影的数据'; break
      }

      document.getElementById('content').innerHTML = text
    })
  </script>
</body>
</html>
```

### 重定向和 404

+ 进入后，默认就是 /
	+ 重定向 `{ path:'/', redirect:'/home' }`
	+ 重定向 `{ path:'/', redirect:{ name: 'home' } }`
	+ 404： 在路由规则的最后一个规则
	  + 写一个很强大的匹配
	  + `{ path:'*', component: nodeFoundVue }`

### 多视图

+ 单视图：留坑的时候，留一个坑对应一个路由和显示一个组件
+ 多视图：留坑的时候，一个坑对应多个路由和多个组件
+ components 是一个对象，对象内有多个 key 和 value
  + key 对应视图的 name 属性
  + value 对应现实的组件对象
+ 多个视图中
  +  `<router-view></router-view>` -> 没有 name 值就是 default
  +  `<router-view name='xxx'></router-view>` -> name 就是 xxx

### 嵌套路由



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

### 

### wappalyzer   

+ chrome插件工具
+ 获取到当前网站的使用技术