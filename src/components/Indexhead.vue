<!--我的首页头部的封装-->
<template>
  <div>
    <div class="header"></div>

    <div class="headlogo">
      <span class="iconfont iconnew"></span>
      <div class="search" @click="$router.push('/Search')">
        <span class="iconfont iconsearch"></span>
        搜索新闻
      </div>
      <span class="iconfont iconwode" @click="$router.push('/User')"></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 20/360 * 100vw;
  background-color: #515151;
}
.headlogo {
  display: flex;
  background-color: #ff0000;
  height: 54/360 * 100vw;
  .iconnew {
    width: 54/360 * 100vw;
    font-size: 54/360 * 100vw;
    color: #ffffff;
    margin: 0 10/360 * 100vw;
  }
  .search {
    width: 210/360 * 100vw;
    height: 34/360 * 100vw;
    line-height: 34/360 * 100vw;
    border-radius: 17/360 * 100vw;
    background-color: #f97979;
    margin-top: 10/360 * 100vw;
    text-align: center;
    color: #ffffff;
    font-size: 16/360 * 100vw;
  }
  .iconsearch {
    height: 18/360 * 100vw;
  }
  .iconwode {
    height: 32/360 * 100vw;
    padding: 0 20/360 * 100vw;
    margin-top: 9/360 * 100vw;
    width: 32/360 * 100vw;
    color: #ffffff;
    font-size: 32/360 * 100vw;
  }
}
</style>