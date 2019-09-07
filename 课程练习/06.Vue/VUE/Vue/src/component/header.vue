<template>
  <div>
    头部组件
    {{ textone }}
    <button @click="show">从 script 中获取父组件的值</button>
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