<template>
  <div class="title-container">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.title-container {
  padding: 0 10px 0 15px;
  margin: 10px 0 20px 0;
  height: 30px;
  border-left: 3px solid #42b884;
  font-size: 19px;
  font-weight: 300;
  color: #2c3e50;
  line-height: 30px;
}
</style>