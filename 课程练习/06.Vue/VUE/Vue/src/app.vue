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
    <input type="text" name="" id="" v-bind:value="mText" >
  </div>-->
  <div>
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

    <header-vue textone='header传值'></header-vue>
    <body-vue :texttwo='textBody'></body-vue>
    <footer-vue></footer-vue>
		<button @click="listen">监听子组件传来的消息</button>
  </div>
</template>

<script>
import connect from './connector.js'
export default {
  // 配置
  // 类似 $scope.xxx = '初始化'

  // class 取一个 返回一个字符串
  // 取多个 返回一个对象
  // 一个学生列表 每个人都有成绩 AB，根据当前学生的成绩匹配不同的颜色 A-red B-pink
  data() {
    //是一个函数
    return {
      // 是一个对象，存放数据的地方
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
      */
		  textBody: '这是body需要接收的数据'
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
		}
  }
};
</script>

<style>
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
