<!--
1.横条组件的封装
-->

<template>
  <div class="fooderwz" @click="handclick">
    <span class="wdleft">{{lable}}</span>
    <span class="WZrigh">
      <span class="wdright">{{desc}}</span>
      <span class="iconfont iconjiantou1"></span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["lable", "desc"],
  methods: {
      handclick(){
          this.$emit('click')
      }
  },
};
</script>

<style lang="less" scoped>
// 文子我的关注部分
.fooderwz {
  // width: 360/360 * 100vw;
  margin-left: 10 /360 * 100vw;
  margin-right: 10 /360 * 100vw;
  height: 50/360 * 100vw;
  border-bottom: 1px solid #d9d9d9;
  line-height: 45/360 * 100vw;
  .wdleft {
    font-size: 17 /360 * 100vw;
  }

  .WZrigh {
    margin-right: 20 /360 * 100vw;
    float: right;
    .wdright {
      padding-right: 5/360 * 100vw;
      font-size: 15 /360 * 100vw;
      color: #aba0b5;
    }
    .iconjiantou1 {
      padding-top: 5 /360 * 100vw;
      font-size: 17 /360 * 100vw;
      color: #d9d9d9;
      font-weight: 600;
    }
  }
}
</style>