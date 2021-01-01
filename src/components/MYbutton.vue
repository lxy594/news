<!--我的登录按钮的组件-->
<template>
  <div class="btns">
    <div class="btn">{{btnText}}</div>
  </div>
</template>

<script>
export default {
  props: ["btnText"]
};
</script>

 <style lang="less" scoped>
 .btns
 {
   margin-left: 10/360*100vw;
 }
.btn {
  color: #ffffff;
  width: 318 /360 * 100vw;
  height: 48 /360 * 100vw;
  line-height: 48 /360 * 100vw;
  text-align: center;
  background-color: #d81e06;
  border-radius: 24 /360 * 100vw;
}
</style>