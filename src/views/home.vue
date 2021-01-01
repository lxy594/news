<template>
  <div>
    <h1>首页</h1>
    <router-link to="/Login">登录页</router-link>
    <br />
    <router-link to="/Register">注册页</router-link><br>
    
    <router-link to="/User">个人详情</router-link><br>
   <router-link to="/Complice">编辑资料</router-link><br>
   
    <router-link to="/focus">我的关注页</router-link><br>
    <router-link to="/text">测试</router-link><br>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
router-link {
  font-size: 20 /360 * 100vw;
}
</style>