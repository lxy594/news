<template>
  <div >
    <div class="herd"></div>
    <div class="bianjitab">
      <span class="iconfont iconjiantou2"></span>
      <h3 class="bianjiwenzi">{{title}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>

.herd {
width:100%;
//   width: 360/360 * 100vw;
  height: 24/360 * 100vw;
  background-color: #757575;
}
.bianjitab{
  display: flex;
align-items: center;
margin-top: 10/360*100vw;
  .iconjiantou2{
    font-size: 15/360*100vw;
margin-left: 10/360*100vw;
font-weight: 600;
color: #5b5b5b;
  }
.bianjiwenzi{
  flex: 1;
    text-align: center;
  }
}
</style>