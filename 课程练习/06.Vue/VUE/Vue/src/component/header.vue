<template>
  <div>
    头部组件
    <!-- {{ textone }} -->
    <!-- <button @click="show">从 script 中获取父组件的值</button> -->

    <!-- <a href="#/music">进入音乐</a>
    <a href="#/movie">进入电影</a>
    <a href="#/">进入首页</a> -->

    <!-- 标签目标位置 -->
    <!-- <router-link :to="{ name:'music' }">进入音乐</router-link>
    <router-link to="/movie">进入电影</router-link> -->
    <!-- <router-link to="/">进入首页</router-link>
    <router-link to="/list">英雄信息</router-link> -->

  </div>
</template>

<script>
export default {
  // 接收父组件值参数的设置
  data () {
    return {

    }
  }, 
  props: ['textone'],
  methods: {
    show: function () {
      alert(this.textone)
    }
  }
}
</script>

<style scoped>
  div {
    height: 100px;
    background-color: yellow;
  }
</style>