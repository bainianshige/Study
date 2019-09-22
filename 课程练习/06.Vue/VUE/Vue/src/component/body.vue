<template>
  <div>
    <router-link :to="{ name:'body.music' }">音乐</router-link>
    <router-link :to="{ name:'body.movie' }">电影</router-link>
    <router-view></router-view>
    <!-- 中间组件 -->
    <!-- {{ texttwo }} -->
  </div>
</template>

<script>
export default {
  props: ['texttwo']
}
</script>

<style scoped>
  div {
    height: 100px;
    background-color: pink;
  }
</style>