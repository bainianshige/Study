// 引入 Vue 
import Vue from 'vue'
// 引入 vue-router 路由插件
import VueRouter from 'vue-router'
// 引入 app.vue 用他的内容来替换 div id = app
import App from './app.vue'

// 引入子组件对象
import headerVue from './component/header.vue'
import bodyVue from './component/body.vue'
import footerVue from './component/footer.vue'
import Detail from './component/detail.vue'
import List from './component/list.vue'
import notFound from './component/notFound.vue'

// 引入 mint-ui 组件对象
import Mint from 'mint-ui'
// 引入 mint-ui 样式
import 'mint-ui/lib/style.css'

// 声明全局组件
Vue.component('headerVue', headerVue)  // 注册一个组件，第一个参数是名称，在 templatete 中使用，第二个参数是实际的对象，显示成什么内容，具备什么功能
Vue.component('bodyVue', bodyVue)
Vue.component('footerVue', footerVue)

// 安装 mint-ui 组件
Vue.use(Mint)

// 安装 vue-router 插件
Vue.use(VueRouter)  // 挂在属性
// 创建路由对象并配置路由规则
let router = new VueRouter({
  // key routes 是固定的
  routes: [
    // 一个个对象
    // 查询字符串(query)的方式，不用更改 path，通过 get 方式传参
    // { name: 'detail', query:{id: index} } -> /detail?id=index
    { name:'detail', path:'/detail', component: Detail },
    { name:'body', path:'/body', component: bodyVue },
    
    // params 的方式，需要更改 path，通过 post 当时传参
    // { name: 'detail', params:{id: index} } -> /detail/id
    // { name:'detail', path:'/detail/:id', component: Detail },
    { name:'list', path:'/list', component: List },
    { path:'/', components: {list: List, detail: Detail} },
    // 重定向 从 / 重定向到 list
    // { path: '/', redirect: { name: 'body' }},
    // 最终无法匹配 -> 404
    { path:'*', component: notFound }
  ]
})

// 创建全局过滤器
Vue.filter('myFilter', function (value) {
  return '全局过滤器'
})

// 创建一个 Vue 的实例，一般一个项目，大多就是一个 Vue 实例来完成显示
new Vue({
  el: '#app',  // 需要渲染的对象

  // 挂载路由
  // router: router,
  // 简写 router
  router,

  // render: function (creater) {  // 渲染的内容  creater 只是一个形参，叫什么都可以
  //   return creater(App)  // App 包含 template/script/style，最终生成 DOM 结构
  // }
  // render: (c) => { 
  //   return c(App);       
  // }
  render: c => c(App)
   // 1.当参数是一个的时候，小括号可以省略
   // 2.当代码只是一行且是返回值的时候，可以省略大括号
})
// 一般来说，key 是固定的，值是设置的（可变的）


