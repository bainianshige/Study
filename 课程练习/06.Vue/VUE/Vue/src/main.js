// 1. 引入 Vue 
import Vue from 'vue'
// 2. 引入 app.vue 用他的内容来替换 div id = app
import App from './app.vue'

// 引入子组件对象
import headerVue from './component/header.vue'
import bodyVue from './component/body.vue'
import footerVue from './component/footer.vue'

// 声明全局组件
Vue.component('headerVue', headerVue)  // 注册一个组件，第一个参数是名称，在 templatete 中使用，第二个参数是实际的对象，显示成什么内容，具备什么功能
Vue.component('bodyVue', bodyVue)
Vue.component('footerVue', footerVue)

// 3. 创建一个 Vue 的实例，一般一个项目，大多就是一个 Vue 实例来完成显示
new Vue({
  el: '#app',  // 需要渲染的对象
  // render: function (creater) {  // 渲染的内容  creater 只是一个形参，叫什么都可以
  //   return creater(App)  // App 包含 template/script/style，最终生成 DOM 结构
  // }

  // render: (c) => { 
  //   return c(App);       
  // }
  render: c => c(App)
   // 1.当参数是一个的时候，小括号可以省略
   // 2.当代码只是一行且时返回值的时候，可以省略大括号

})

// 一般来说，key 是固定的，值是设置的（可变的）


