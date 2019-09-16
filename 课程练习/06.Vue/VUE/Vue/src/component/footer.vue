<template>
  <div>
    底部组件
    <!-- <button @click="call">发送数据通信</button> -->
  </div>
</template>

<script>
import connect from '../connector.js'
export default {
  methods: {
    call: function () {
      // 发送通信数据
      connect.$emit('test', '传给父组件的数据')
    }
  }
}
</script>

<style scoped>
  div {
    height: 100px;
    background-color: skyblue;
  }
</style>