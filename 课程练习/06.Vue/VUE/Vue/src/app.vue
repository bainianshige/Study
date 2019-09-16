<template>
  <!-- 只能包含一个根节点 -->
  <!-- <div>
    <pre>
      - v-text
      - v-html
      - v-if
      - v-show
      - v-model
    </pre>
     v-text 
    <span v-text="text"></span>
    <hr />

     v-html 
    <span v-html="html"></span>
    <hr />

     v-if 
    <div v-if="isShow" style="height:100px;background-color:red"></div>
    <hr />

     v-show 
    <div v-show="isShow" style="height:100px;background-color:pink"></div>
    <hr />
  
     v-model 
    <input type="text" name id v-model="mText" />
    {{ mText }}
     给下边的 input value 赋值用 v-bind:value='mTest' 
    <input type="text" name="" id="" v-bind:value="mText" >  -->

    <!-- <div v-bind:class="isRed?'red':'pink'">单个</div>
    <div :class="{'red':true,'big':true}">多个</div>复杂情况，通过遍历，根据当前对象的成绩，匹配成绩和样式的清单对象，用成绩做 Key，取对象的 Value，最终返回字符串做样式名
    <ul>
      <li v-for="stu in stus" :class="{'A':'red','B':'pink'}[stu.score]">{{ stu.name }}</li>
    </ul>
    <button @click="change">变化</button>-->

    <!-- <ul>
      <li v-for="(stu, index) in stus" :key="index">{{ index }}:{{ stu }}</li>
      使用对象的方式<hr>
      <li v-for="(value, key, index) in person" :key="index">{{ index }}:{{ key }}:{{ value }}</li>
    </ul>-->

    <!-- <ul>
      <li
        v-for="(hero, index) in heros"
        :key="index"
        :class="{'A':'red','B':'blue','C':'yellow','D':'pink'}[hero.score]"
      >
        {{ hero.name }}{{ hero.score }}
        <button @click="del(index)">删除</button>
      </li>
    </ul>英雄姓名：
    <input type="text" name id v-model="heroName" />
    <br />英雄成绩：
    <input type="text" name id v-model="heroScore" />
    <br />
    <button @click="addHero">添加</button>-->

    <!-- <header-vue textone='header传值'></header-vue>
    <body-vue :texttwo='textBody'></body-vue>
    <footer-vue></footer-vue>
		<button @click="listen">监听子组件传来的消息</button> -->

    <!-- 过滤器 -->
    <!-- 输入内容
    <input type="text" name="" id="" v-model="text">
    显示: {{ text | myFilter }} -->

    <!-- 获取 DOM 元素
    <body-vue ref="body"></body-vue>
    <div ref="myDiv">
      {{ text }}
    </div>

    <mt-header title="多个按钮">
        <mt-button icon="back">返回</mt-button>
        <mt-button @click="handleClose">关闭</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <button @click="handleClose">我是弹出框</button>

    <mt-switch v-model="value"></mt-switch> -->

    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>

    <header-vue></header-vue>
    <router-view class="b"></router-view>
    <button @click="goList">跳到列表</button>
    <button @click="params">传递参数</button>
    <footer-vue></footer-vue>
  </div>-->
  <div>
    <header-vue></header-vue>
    <router-view name="list"></router-view>
    <router-view name="detail"></router-view>
    <footer-vue></footer-vue>
  </div> 
</template>

<script>
// 在 js 部分所有变量都是模块作用域
// 如果需要就必须单独引入
import { Toast } from 'mint-ui'

import connect from './connector.js'
export default {
  /*
    配置
    类似 $scope.xxx = '初始化'

    class 取一个 返回一个字符串
    取多个 返回一个对象
    一个学生列表 每个人都有成绩 AB，根据当前学生的成绩匹配不同的颜色 A-red B-pink
  */
  data() {
    //是一个函数
    return {
      // 是一个对象，存放数据的地方
      value: true
        /*
        text: "我是 v-text",
        html: `
            <ul>
              <li>第一个标签</li>
              <li>第二个标签</li>
            </ul>
          `,
        isShow: true,
        mText: "数据双向绑定",
        heroName: "",
        heroScore: "",
        isRed: false,
        stus: [{ name: "zhangsan", score: "A" }, { name: "lisi", score: "B" }],
        person: { name: "mazi", alise: "麻子" },
        heros: [
          {
            id: 1,
            name: "奥丽安娜",
            score: "A"
          },
          {
            id: 2,
            name: "李白",
            score: "B"
          },
          {
            id: 3,
            name: "杜甫",
            score: "C"
          },
          {
            id: 4,
            name: "阿拉斯加",
            score: "D"
          }
        ]
        textBody: '这是body需要接收的数据'
      */

    }
  },
  // 声明函数，属于组件对象
  methods: {
    // 包含多个函数名做 key，函数体做 value
    change: function() {
      // 在 script 中能使用的对象，基本 template 中也能使用但是在 script 中要加 this， template 中不要 this
      this.isRed = !this.isRed;
      this.stus.push({ name: "wangwu", score: "A" });
    },
    addHero: function() {
      // 获取页面输入的值
      this.heros.push({ name: this.heroName, score: this.heroScore });
      this.heroName = "";
      this.heroScore = "";
    },
    del: function(index) {
      this.heros.splice(index, 1);
		},
		listen: function () {
			connect.$on('test', function (message) {
				console.log(message)
			})
    },
    handleClose: function () {
      Toast('提示信息')
    },
    goList: function () {
      this.$router.push({ name: 'list' })
    },
    params: function () {
      this.$router.push({ name: 'list', query: { id: '这是一个id' } })
    }
  },
  filters: {
    // myFilter:  function (value) { // value -> text
    //   // 将输入的内容进行一个反转
    //   // value 的值是字符串
    //   // 转换成数组，反转数组，转换成字符串
    //   return value.split('').reverse().join('')
    // }
  },
  // 组件创建后，数据已经完成初始化，但是 DOM 还未生成
  created() {  // 事件的处理函数（created）
    // console.log('created:', this.$refs.myDiv)
  },
  // 数据装载 DOM 上后，将数据渲染到 DOM 中，DOM 已经生成
  mounted() {
    // console.log('body', this.$refs.body.$el)
    // 获取组件对象，并获取到他的 DOM 对象
    
    // this.$refs.body.$el.style.backgroundColor = 'pink'

    // console.log('mounted:', this.$refs.myDiv)
    // 涉及 DOM 类的操作
    // this.$refs.myDiv.innerHTML = '这是innerHTML加入的内容'
    // 涉及的到数据的操作
    // this.text = '这是text的内容'
    // this.$refs.myDiv.style.backgroundColor = 'pink'
    // this.$refs.myDiv.style.color = 'red'
  }
};
</script>

<style>
.b {
  height: 100px;
  background-color: pink;
}
.mint-swipe {
  height: 100px;
  background-color: pink;
}
.red {
  background-color: red;
}
.pink {
  background-color: pink;
}
.big {
  font-size: 30px;
}
.blue {
  background-color: skyblue;
}
.yellow {
  background-color: yellow;
}
</style>
