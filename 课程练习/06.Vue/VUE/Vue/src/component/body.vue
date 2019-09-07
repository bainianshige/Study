<template>
  <div>
    中间组件
    {{ texttwo }}
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